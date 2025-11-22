import type { Template } from '../types/thumbnail.types';
import { minimalTemplates } from './minimal';
import { impactTemplates } from './impact';
import { dynamicTemplates } from './dynamic';
import { professionalTemplates } from './professional';
import { storytellingTemplates } from './storytelling';

/**
 * 모든 템플릿 배열
 */
export const allTemplates: Template[] = [
  ...minimalTemplates,
  ...impactTemplates,
  ...dynamicTemplates,
  ...professionalTemplates,
  ...storytellingTemplates,
];

/**
 * 템플릿을 ID로 찾습니다.
 * @param id 템플릿 ID
 * @returns 템플릿 또는 undefined
 */
export function getTemplateById(id: string): Template | undefined {
  return allTemplates.find(template => template.id === id);
}

/**
 * 기본 템플릿을 반환합니다.
 * @returns 기본 템플릿
 */
export function getDefaultTemplate(): Template {
  return minimalTemplates[0];
}

/**
 * 스타일별 템플릿을 반환합니다.
 * @param style 템플릿 스타일
 * @returns 해당 스타일의 템플릿 배열
 */
export function getTemplatesByStyle(style: string): Template[] {
  return allTemplates.filter(template => template.style === style);
}

// 개별 템플릿 export
export * from './minimal';
export * from './impact';
export * from './dynamic';
export * from './professional';
export * from './storytelling';
