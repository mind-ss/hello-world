import type { Template } from '../types/thumbnail.types';

/**
 * 미니멀 템플릿: 깔끔한 배경에 큰 텍스트 중심
 */
export const minimalTemplate: Template = {
  id: 'minimal',
  name: '미니멀',
  style: 'minimal',
  description: '깔끔한 배경에 큰 텍스트를 중심으로 한 심플한 디자인',
  background: {
    type: 'solid',
    colors: ['#FFFFFF'],
  },
  textLayout: {
    position: 'center',
    alignment: 'center',
    maxWidth: 1100,
    padding: {
      top: 100,
      right: 90,
      bottom: 100,
      left: 90,
    },
  },
  textStyle: {
    fontFamily: 'Pretendard',
    fontSize: 84,
    fontWeight: 'black',
    color: '#000000',
    lineHeight: 1.2,
  },
  decorations: [],
};

/**
 * 미니멀 템플릿 - 다크 버전
 */
export const minimalDarkTemplate: Template = {
  ...minimalTemplate,
  id: 'minimal-dark',
  name: '미니멀 (다크)',
  background: {
    type: 'solid',
    colors: ['#1A1A1A'],
  },
  textStyle: {
    ...minimalTemplate.textStyle,
    color: '#FFFFFF',
  },
};

/**
 * 미니멀 템플릿 - 그라디언트 버전
 */
export const minimalGradientTemplate: Template = {
  ...minimalTemplate,
  id: 'minimal-gradient',
  name: '미니멀 (그라디언트)',
  background: {
    type: 'gradient',
    colors: ['#667EEA', '#764BA2'],
    angle: 135,
  },
  textStyle: {
    ...minimalTemplate.textStyle,
    color: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 2,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 10,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
};

/**
 * 미니멀 템플릿 - 컬러풀 버전
 */
export const minimalColorfulTemplate: Template = {
  ...minimalTemplate,
  id: 'minimal-colorful',
  name: '미니멀 (컬러풀)',
  background: {
    type: 'gradient',
    colors: ['#FFD89B', '#19547B'],
    angle: 45,
  },
  textStyle: {
    ...minimalTemplate.textStyle,
    color: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 3,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 15,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
  },
};

// 미니멀 템플릿 모음
export const minimalTemplates: Template[] = [
  minimalTemplate,
  minimalDarkTemplate,
  minimalGradientTemplate,
  minimalColorfulTemplate,
];
