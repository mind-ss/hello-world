import type { Template } from '../types/thumbnail.types';

/**
 * 다이나믹 템플릿: 대각선/기하학적 요소가 있는 역동적 디자인
 */
export const dynamicTemplate: Template = {
  id: 'dynamic',
  name: '다이나믹',
  style: 'dynamic',
  description: '대각선과 기하학적 요소로 역동적인 느낌을 주는 디자인',
  background: {
    type: 'gradient',
    colors: ['#667EEA', '#764BA2'],
    angle: 135,
  },
  textLayout: {
    position: 'center',
    alignment: 'left',
    maxWidth: 900,
    padding: {
      top: 100,
      right: 200,
      bottom: 100,
      left: 100,
    },
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: 72,
    fontWeight: 'extrabold',
    color: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 3,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 15,
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    lineHeight: 1.2,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#FFD700',
      position: { x: 1100, y: 200 },
      size: { width: 300, height: 300 },
      rotation: 45,
    },
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#FF6B6B',
      position: { x: 100, y: 550 },
      size: { width: 200, height: 200 },
      rotation: 30,
    },
  ],
};

/**
 * 다이나믹 템플릿 - 오렌지 버전
 */
export const dynamicOrangeTemplate: Template = {
  ...dynamicTemplate,
  id: 'dynamic-orange',
  name: '다이나믹 (오렌지)',
  background: {
    type: 'gradient',
    colors: ['#FF512F', '#DD2476'],
    angle: 45,
  },
  textStyle: {
    ...dynamicTemplate.textStyle,
    fontFamily: 'Bebas Neue',
  },
  decorations: [
    {
      type: 'shape',
      shape: 'triangle',
      color: '#00D9FF',
      position: { x: 1100, y: 150 },
      size: { width: 250, height: 250 },
      rotation: 0,
    },
    {
      type: 'shape',
      shape: 'circle',
      color: '#FFD700',
      position: { x: 150, y: 600 },
      size: { width: 180, height: 180 },
    },
  ],
};

/**
 * 다이나믹 템플릿 - 그린 버전
 */
export const dynamicGreenTemplate: Template = {
  ...dynamicTemplate,
  id: 'dynamic-green',
  name: '다이나믹 (그린)',
  background: {
    type: 'gradient',
    colors: ['#11998E', '#38EF7D'],
    angle: 90,
  },
  textLayout: {
    ...dynamicTemplate.textLayout,
    alignment: 'right',
    padding: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 200,
    },
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#FFFFFF',
      position: { x: 200, y: 200 },
      size: { width: 250, height: 250 },
      rotation: 45,
    },
    {
      type: 'shape',
      shape: 'circle',
      color: '#FF6B6B',
      position: { x: 1050, y: 500 },
      size: { width: 200, height: 200 },
    },
  ],
};

/**
 * 다이나믹 템플릿 - 퍼플 버전
 */
export const dynamicPurpleTemplate: Template = {
  ...dynamicTemplate,
  id: 'dynamic-purple',
  name: '다이나믹 (퍼플)',
  background: {
    type: 'gradient',
    colors: ['#6A3093', '#A044FF'],
    angle: 180,
  },
  textStyle: {
    ...dynamicTemplate.textStyle,
    fontFamily: 'Black Han Sans',
    fontSize: 80,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'triangle',
      color: '#00FFFF',
      position: { x: 950, y: 180 },
      size: { width: 280, height: 280 },
      rotation: 90,
    },
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#FFD700',
      position: { x: 150, y: 550 },
      size: { width: 180, height: 180 },
      rotation: 45,
    },
  ],
};

// 다이나믹 템플릿 모음
export const dynamicTemplates: Template[] = [
  dynamicTemplate,
  dynamicOrangeTemplate,
  dynamicGreenTemplate,
  dynamicPurpleTemplate,
];
