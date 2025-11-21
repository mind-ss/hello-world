// 템플릿 스타일 타입
export type TemplateStyle = 'minimal' | 'dynamic' | 'professional' | 'impact' | 'storytelling';

// 텍스트 정렬 타입
export type TextAlignment = 'left' | 'center' | 'right';

// 텍스트 위치 타입
export type TextPosition = 'top' | 'center' | 'bottom';

// 배경 타입
export type BackgroundType = 'solid' | 'gradient';

// 폰트 종류 (한글/영문)
export type KoreanFont = 'Noto Sans KR' | 'Pretendard' | 'Black Han Sans';
export type EnglishFont = 'Montserrat' | 'Bebas Neue' | 'Roboto';
export type FontFamily = KoreanFont | EnglishFont;

// 폰트 굵기
export type FontWeight = 'bold' | 'extrabold' | 'black';

// 장식 요소 타입
export interface DecorativeElement {
  type: 'shape' | 'line' | 'emoji';
  shape?: 'circle' | 'rectangle' | 'triangle';
  color?: string;
  position: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
  rotation?: number;
  emoji?: string;
}

// 배경 설정
export interface Background {
  type: BackgroundType;
  colors: string[];
  angle?: number; // 그라디언트 각도 (gradient일 때)
  image?: string; // 배경 이미지 URL
}

// 텍스트 레이아웃
export interface TextLayout {
  position: TextPosition;
  alignment: TextAlignment;
  maxWidth: number; // 텍스트 최대 너비 (px)
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

// 텍스트 스타일
export interface TextStyle {
  fontFamily: FontFamily;
  fontSize: number;
  fontWeight: FontWeight;
  color: string;
  strokeColor?: string; // 아웃라인 색상
  strokeWidth?: number; // 아웃라인 두께
  shadowColor?: string; // 그림자 색상
  shadowBlur?: number; // 그림자 블러
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  lineHeight: number; // 줄 간격
}

// 템플릿 인터페이스
export interface Template {
  id: string;
  name: string;
  style: TemplateStyle;
  description: string;
  background: Background;
  textLayout: TextLayout;
  textStyle: TextStyle;
  decorations: DecorativeElement[];
  thumbnail?: string; // 템플릿 미리보기 이미지
}

// 썸네일 설정
export interface ThumbnailConfig {
  title: string;
  template: Template;
  customColors?: string[]; // 사용자 지정 색상
  backgroundImage?: string; // 사용자 업로드 배경 이미지
  width: number; // 기본 1280
  height: number; // 기본 720
}

// 내보내기 옵션
export interface ExportOptions {
  format: 'png' | 'jpg';
  quality?: number; // jpg일 때 품질 (0-1)
  width: number;
  height: number;
}

// 배치 생성 설정
export interface BatchGenerationConfig {
  title: string;
  count: number; // 생성할 썸네일 개수
  variationOptions: {
    templates?: boolean; // 템플릿 변경
    colors?: boolean; // 색상 변경
    fonts?: boolean; // 폰트 변경
    layouts?: boolean; // 레이아웃 변경
  };
}

// 생성된 썸네일 (배치용)
export interface GeneratedThumbnail {
  id: string;
  versionNumber: number;
  config: ThumbnailConfig;
  dataUrl: string; // base64 이미지 데이터
  timestamp: number;
}

// 색상 대비 결과
export interface ContrastResult {
  ratio: number;
  passesAA: boolean; // WCAG AA 기준 (4.5:1)
  passesAAA: boolean; // WCAG AAA 기준 (7:1)
}

// 텍스트 최적화 결과
export interface TextOptimizationResult {
  fontSize: number;
  lineCount: number;
  lines: string[];
  needsAdjustment: boolean;
  suggestions?: string[];
}
