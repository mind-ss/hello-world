import type { Template } from '../types/thumbnail.types';

/**
 * 임팩트 템플릿: 강렬한 색상과 굵은 텍스트
 */
export const impactTemplate: Template = {
  id: 'impact',
  name: '임팩트',
  style: 'impact',
  description: '강렬한 색상과 굵은 텍스트로 시선을 사로잡는 디자인',
  background: {
    type: 'gradient',
    colors: ['#FF0844', '#FFB199'],
    angle: 180,
  },
  textLayout: {
    position: 'center',
    alignment: 'center',
    maxWidth: 1100,
    padding: {
      top: 80,
      right: 90,
      bottom: 80,
      left: 90,
    },
  },
  textStyle: {
    fontFamily: 'Black Han Sans',
    fontSize: 96,
    fontWeight: 'black',
    color: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 4,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowBlur: 20,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    lineHeight: 1.1,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#FFD700',
      position: { x: 50, y: 50 },
      size: { width: 150, height: 150 },
      rotation: 45,
    },
    {
      type: 'shape',
      shape: 'circle',
      color: '#00FFFF',
      position: { x: 1100, y: 600 },
      size: { width: 120, height: 120 },
    },
  ],
};

/**
 * 임팩트 템플릿 - 블루 버전
 */
export const impactBlueTemplate: Template = {
  ...impactTemplate,
  id: 'impact-blue',
  name: '임팩트 (블루)',
  background: {
    type: 'gradient',
    colors: ['#0575E6', '#021B79'],
    angle: 135,
  },
  textStyle: {
    ...impactTemplate.textStyle,
    fontFamily: 'Bebas Neue',
    strokeWidth: 5,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#00D9FF',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 200 },
      rotation: 30,
    },
  ],
};

/**
 * 임팩트 템플릿 - 옐로우 버전
 */
export const impactYellowTemplate: Template = {
  ...impactTemplate,
  id: 'impact-yellow',
  name: '임팩트 (옐로우)',
  background: {
    type: 'gradient',
    colors: ['#F2994A', '#F2C94C'],
    angle: 90,
  },
  textStyle: {
    ...impactTemplate.textStyle,
    fontFamily: 'Montserrat',
    color: '#000000',
    strokeColor: '#FFFFFF',
    strokeWidth: 6,
    shadowColor: 'rgba(255, 255, 255, 0.5)',
  },
  decorations: [
    {
      type: 'shape',
      shape: 'circle',
      color: '#FF6B6B',
      position: { x: 1150, y: 50 },
      size: { width: 100, height: 100 },
    },
    {
      type: 'shape',
      shape: 'circle',
      color: '#4ECDC4',
      position: { x: 50, y: 620 },
      size: { width: 80, height: 80 },
    },
  ],
};

/**
 * 임팩트 템플릿 - 네온 버전
 */
export const impactNeonTemplate: Template = {
  ...impactTemplate,
  id: 'impact-neon',
  name: '임팩트 (네온)',
  background: {
    type: 'solid',
    colors: ['#000000'],
  },
  textStyle: {
    ...impactTemplate.textStyle,
    fontFamily: 'Bebas Neue',
    fontSize: 92,
    color: '#00FF00',
    strokeColor: '#00FF00',
    strokeWidth: 2,
    shadowColor: '#00FF00',
    shadowBlur: 30,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#FF00FF',
      position: { x: 80, y: 80 },
      size: { width: 180, height: 180 },
      rotation: 45,
    },
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#00FFFF',
      position: { x: 1020, y: 460 },
      size: { width: 180, height: 180 },
      rotation: 45,
    },
  ],
};

/**
 * 임팩트 템플릿 - 다크 레드 버전
 */
export const impactDarkRedTemplate: Template = {
  ...impactTemplate,
  id: 'impact-dark-red',
  name: '임팩트 (다크 레드)',
  background: {
    type: 'gradient',
    colors: ['#360033', '#0B8793'],
    angle: 45,
  },
  textStyle: {
    ...impactTemplate.textStyle,
    fontFamily: 'Black Han Sans',
    fontSize: 88,
    strokeWidth: 5,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'triangle',
      color: '#FF6B6B',
      position: { x: 1100, y: 100 },
      size: { width: 150, height: 150 },
      rotation: 180,
    },
  ],
};

// 임팩트 템플릿 모음
export const impactTemplates: Template[] = [
  impactTemplate,
  impactBlueTemplate,
  impactYellowTemplate,
  impactNeonTemplate,
  impactDarkRedTemplate,
];
