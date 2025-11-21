import type { TextOptimizationResult } from '../types/thumbnail.types';

/**
 * 텍스트 길이에 따라 최적의 폰트 크기를 계산합니다.
 * @param text 입력 텍스트
 * @param maxWidth 최대 너비 (px)
 * @param baseSize 기본 폰트 크기
 * @returns 최적화된 폰트 크기
 */
export function calculateOptimalFontSize(
  text: string,
  maxWidth: number,
  baseSize: number = 84
): number {
  const lineCount = estimateLineCount(text, maxWidth, baseSize);

  if (lineCount === 1) return 84;
  if (lineCount === 2) return 64;
  if (lineCount >= 3) return 48;

  return baseSize;
}

/**
 * 텍스트의 예상 줄 수를 계산합니다.
 * @param text 입력 텍스트
 * @param maxWidth 최대 너비 (px)
 * @param fontSize 폰트 크기
 * @returns 예상 줄 수
 */
export function estimateLineCount(
  text: string,
  maxWidth: number,
  fontSize: number
): number {
  // 대략적인 문자 너비 계산 (한글은 폰트 크기와 비슷, 영문은 약 60%)
  const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  const avgCharWidth = hasKorean ? fontSize * 0.9 : fontSize * 0.6;

  const words = text.split(' ');
  let currentLineWidth = 0;
  let lineCount = 1;

  for (const word of words) {
    const wordWidth = word.length * avgCharWidth;

    if (currentLineWidth + wordWidth > maxWidth) {
      lineCount++;
      currentLineWidth = wordWidth;
    } else {
      currentLineWidth += wordWidth + (avgCharWidth * 0.3); // 공백 너비
    }
  }

  return lineCount;
}

/**
 * 텍스트를 자동으로 줄바꿈하여 배열로 반환합니다.
 * @param text 입력 텍스트
 * @param maxWidth 최대 너비 (px)
 * @param fontSize 폰트 크기
 * @returns 줄바꿈된 텍스트 배열
 */
export function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number
): string[] {
  const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  const avgCharWidth = hasKorean ? fontSize * 0.9 : fontSize * 0.6;

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * avgCharWidth;

    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * 텍스트를 최적화하고 결과를 반환합니다.
 * @param text 입력 텍스트
 * @param maxWidth 최대 너비 (px)
 * @returns 텍스트 최적화 결과
 */
export function optimizeText(
  text: string,
  maxWidth: number
): TextOptimizationResult {
  const fontSize = calculateOptimalFontSize(text, maxWidth);
  const lines = wrapText(text, maxWidth, fontSize);
  const lineCount = lines.length;

  const needsAdjustment = lineCount > 3;
  const suggestions: string[] = [];

  if (needsAdjustment) {
    suggestions.push('텍스트가 너무 깁니다. 3줄 이하로 줄여주세요.');
    suggestions.push('핵심 키워드만 남기고 불필요한 단어를 제거하세요.');
  }

  if (text.length > 50) {
    suggestions.push('50자 이하로 작성하는 것을 권장합니다.');
  }

  return {
    fontSize,
    lineCount,
    lines: lines.slice(0, 3), // 최대 3줄까지만
    needsAdjustment,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
}

/**
 * 텍스트의 실제 너비를 측정합니다 (캔버스 사용)
 * @param text 측정할 텍스트
 * @param fontSize 폰트 크기
 * @param fontFamily 폰트 패밀리
 * @param fontWeight 폰트 굵기
 * @returns 텍스트 너비 (px)
 */
export function measureTextWidth(
  text: string,
  fontSize: number,
  fontFamily: string,
  fontWeight: string = 'bold'
): number {
  // 임시 캔버스 생성
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return 0;

  // 폰트 설정
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  // 텍스트 너비 측정
  const metrics = context.measureText(text);

  return metrics.width;
}

/**
 * 텍스트를 정확한 너비로 줄바꿈합니다 (캔버스 측정 사용)
 * @param text 입력 텍스트
 * @param maxWidth 최대 너비
 * @param fontSize 폰트 크기
 * @param fontFamily 폰트 패밀리
 * @param fontWeight 폰트 굵기
 * @returns 줄바꿈된 텍스트 배열
 */
export function wrapTextAccurate(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: string = 'bold'
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = measureTextWidth(testLine, fontSize, fontFamily, fontWeight);

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
