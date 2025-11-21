import type {
  Template,
  ThumbnailConfig,
  BatchGenerationConfig,
  FontFamily,
} from '../types/thumbnail.types';

/**
 * 배치 생성을 위한 템플릿 조합을 생성합니다.
 * @param templates 사용 가능한 템플릿 배열
 * @param config 배치 생성 설정
 * @returns 생성할 썸네일 설정 배열
 */
export function generateBatchConfigs(
  templates: Template[],
  config: BatchGenerationConfig
): ThumbnailConfig[] {
  const { title, count, variationOptions } = config;
  const configs: ThumbnailConfig[] = [];

  // 변형 옵션에 따라 조합 생성
  const variations = generateVariations(templates, variationOptions, count);

  for (let i = 0; i < Math.min(count, variations.length); i++) {
    const variation = variations[i];

    configs.push({
      title,
      template: variation,
      width: 1280,
      height: 720,
    });
  }

  return configs;
}

/**
 * 템플릿 변형을 생성합니다.
 * @param templates 기본 템플릿 배열
 * @param options 변형 옵션
 * @param count 생성할 개수
 * @returns 변형된 템플릿 배열
 */
function generateVariations(
  templates: Template[],
  options: BatchGenerationConfig['variationOptions'],
  count: number
): Template[] {
  const variations: Template[] = [];

  // 템플릿 변경이 활성화된 경우
  if (options.templates) {
    for (const template of templates) {
      variations.push({ ...template });

      // 색상 변경
      if (options.colors) {
        const colorVariations = generateColorVariations(template);
        variations.push(...colorVariations);
      }

      // 폰트 변경
      if (options.fonts) {
        const fontVariations = generateFontVariations(template);
        variations.push(...fontVariations);
      }

      // 레이아웃 변경
      if (options.layouts) {
        const layoutVariations = generateLayoutVariations(template);
        variations.push(...layoutVariations);
      }
    }
  } else {
    // 템플릿 변경이 비활성화된 경우, 첫 번째 템플릿만 사용
    const baseTemplate = templates[0];

    if (options.colors) {
      const colorVariations = generateColorVariations(baseTemplate);
      variations.push(...colorVariations);
    }

    if (options.fonts) {
      const fontVariations = generateFontVariations(baseTemplate);
      variations.push(...fontVariations);
    }

    if (options.layouts) {
      const layoutVariations = generateLayoutVariations(baseTemplate);
      variations.push(...layoutVariations);
    }
  }

  // 중복 제거 및 개수 제한
  const uniqueVariations = deduplicateTemplates(variations);

  return uniqueVariations.slice(0, count);
}

/**
 * 색상 변형을 생성합니다.
 * @param template 기본 템플릿
 * @returns 색상이 변형된 템플릿 배열
 */
function generateColorVariations(template: Template): Template[] {
  const variations: Template[] = [];

  const colorSchemes = [
    ['#FF6B6B', '#4ECDC4'], // 산호색 + 청록색
    ['#A8E6CF', '#FFD3B6'], // 민트 + 복숭아
    ['#FFA07A', '#20B2AA'], // 연어 + 라이트 시그린
    ['#DDA15E', '#BC6C25'], // 황갈색 조합
    ['#6C5CE7', '#FDCB6E'], // 보라 + 노랑
    ['#00B894', '#FFFFFF'], // 초록 + 흰색
    ['#2D3436', '#FDCB6E'], // 검정 + 노랑
    ['#0984E3', '#FFFFFF'], // 파랑 + 흰색
  ];

  for (const colors of colorSchemes) {
    variations.push({
      ...template,
      id: `${template.id}-color-${variations.length}`,
      background: {
        ...template.background,
        colors,
      },
    });
  }

  return variations;
}

/**
 * 폰트 변형을 생성합니다.
 * @param template 기본 템플릿
 * @returns 폰트가 변형된 템플릿 배열
 */
function generateFontVariations(template: Template): Template[] {
  const variations: Template[] = [];

  const fonts: FontFamily[] = [
    'Noto Sans KR',
    'Pretendard',
    'Black Han Sans',
    'Montserrat',
    'Bebas Neue',
    'Roboto',
  ];

  for (const font of fonts) {
    variations.push({
      ...template,
      id: `${template.id}-font-${variations.length}`,
      textStyle: {
        ...template.textStyle,
        fontFamily: font,
      },
    });
  }

  return variations;
}

/**
 * 레이아웃 변형을 생성합니다.
 * @param template 기본 템플릿
 * @returns 레이아웃이 변형된 템플릿 배열
 */
function generateLayoutVariations(template: Template): Template[] {
  const variations: Template[] = [];

  const positions: Array<{ position: 'top' | 'center' | 'bottom'; alignment: 'left' | 'center' | 'right' }> = [
    { position: 'top', alignment: 'center' },
    { position: 'center', alignment: 'center' },
    { position: 'bottom', alignment: 'center' },
    { position: 'center', alignment: 'left' },
    { position: 'center', alignment: 'right' },
  ];

  for (const layout of positions) {
    variations.push({
      ...template,
      id: `${template.id}-layout-${variations.length}`,
      textLayout: {
        ...template.textLayout,
        position: layout.position,
        alignment: layout.alignment,
      },
    });
  }

  return variations;
}

/**
 * 템플릿 배열에서 중복을 제거합니다.
 * @param templates 템플릿 배열
 * @returns 중복이 제거된 템플릿 배열
 */
function deduplicateTemplates(templates: Template[]): Template[] {
  const seen = new Set<string>();
  const unique: Template[] = [];

  for (const template of templates) {
    // 템플릿의 고유 식별자 생성
    const key = JSON.stringify({
      style: template.style,
      background: template.background,
      textLayout: template.textLayout,
      textStyle: template.textStyle,
    });

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(template);
    }
  }

  return unique;
}

/**
 * 버전 번호를 파일명에 포함시킵니다.
 * @param baseFilename 기본 파일명
 * @param versionNumber 버전 번호
 * @returns 버전이 포함된 파일명
 */
export function generateVersionedFilename(
  baseFilename: string,
  versionNumber: number
): string {
  return `${baseFilename}_v${versionNumber.toString().padStart(2, '0')}`;
}

/**
 * 랜덤하게 템플릿을 섞습니다.
 * @param templates 템플릿 배열
 * @returns 섞인 템플릿 배열
 */
export function shuffleTemplates(templates: Template[]): Template[] {
  const shuffled = [...templates];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
