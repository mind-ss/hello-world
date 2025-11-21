import type { ContrastResult } from '../types/thumbnail.types';

/**
 * Hex 색상을 RGB로 변환합니다.
 * @param hex Hex 색상 코드 (#RRGGBB)
 * @returns RGB 객체 {r, g, b}
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // # 제거
  const cleanHex = hex.replace('#', '');

  // 3자리 hex를 6자리로 확장
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

/**
 * RGB 값의 상대 휘도(relative luminance)를 계산합니다.
 * @param r Red (0-255)
 * @param g Green (0-255)
 * @param b Blue (0-255)
 * @returns 상대 휘도 (0-1)
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  // RGB 값을 0-1 범위로 정규화
  const [rs, gs, bs] = [r, g, b].map(val => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  // ITU-R BT.709 계수를 사용한 휘도 계산
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * 두 색상 간의 대비 비율을 계산합니다.
 * @param color1 첫 번째 색상 (Hex)
 * @param color2 두 번째 색상 (Hex)
 * @returns 대비 비율 (1-21)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 색상 대비를 확인하고 WCAG 기준 통과 여부를 반환합니다.
 * @param bgColor 배경 색상 (Hex)
 * @param textColor 텍스트 색상 (Hex)
 * @returns 대비 검사 결과
 */
export function checkContrast(bgColor: string, textColor: string): ContrastResult {
  const ratio = calculateContrastRatio(bgColor, textColor);

  return {
    ratio: Math.round(ratio * 100) / 100, // 소수점 2자리
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
  };
}

/**
 * 배경 색상에 적합한 텍스트 색상을 제안합니다.
 * @param bgColor 배경 색상 (Hex)
 * @returns 권장 텍스트 색상 (흰색 또는 검은색)
 */
export function suggestTextColor(bgColor: string): string {
  const rgb = hexToRgb(bgColor);

  if (!rgb) return '#FFFFFF';

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);

  // 휘도가 0.5 이상이면 어두운 배경이므로 밝은 텍스트
  // 휘도가 0.5 미만이면 밝은 배경이므로 어두운 텍스트
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * 색상이 어두운지 밝은지 판단합니다.
 * @param color 색상 (Hex)
 * @returns true면 어두운 색상, false면 밝은 색상
 */
export function isDarkColor(color: string): boolean {
  const rgb = hexToRgb(color);

  if (!rgb) return false;

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);

  return luminance < 0.5;
}

/**
 * 대비가 낮을 때 텍스트 스타일 개선 방법을 제안합니다.
 * @param bgColor 배경 색상
 * @param textColor 텍스트 색상
 * @returns 개선 방법 제안
 */
export function suggestContrastImprovement(
  bgColor: string,
  textColor: string
): {
  needsImprovement: boolean;
  suggestions: string[];
  recommendedStroke?: string;
  recommendedShadow?: string;
} {
  const contrast = checkContrast(bgColor, textColor);

  if (contrast.passesAA) {
    return {
      needsImprovement: false,
      suggestions: [],
    };
  }

  const suggestions: string[] = [];
  const isDark = isDarkColor(bgColor);

  suggestions.push('텍스트 색상을 변경하세요.');

  if (contrast.ratio < 3) {
    suggestions.push('텍스트에 아웃라인(stroke)을 추가하세요.');
    suggestions.push('텍스트에 그림자(shadow)를 추가하세요.');
  }

  return {
    needsImprovement: true,
    suggestions,
    recommendedStroke: isDark ? '#000000' : '#FFFFFF',
    recommendedShadow: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  };
}

/**
 * 그라디언트 배경에서 평균 색상을 계산합니다.
 * @param colors 그라디언트 색상 배열
 * @returns 평균 색상 (Hex)
 */
export function getAverageColor(colors: string[]): string {
  const rgbs = colors.map(hexToRgb).filter(rgb => rgb !== null) as Array<{ r: number; g: number; b: number }>;

  if (rgbs.length === 0) return '#000000';

  const avgR = Math.round(rgbs.reduce((sum, rgb) => sum + rgb.r, 0) / rgbs.length);
  const avgG = Math.round(rgbs.reduce((sum, rgb) => sum + rgb.g, 0) / rgbs.length);
  const avgB = Math.round(rgbs.reduce((sum, rgb) => sum + rgb.b, 0) / rgbs.length);

  return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
}
