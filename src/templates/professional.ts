import type { Template } from '../types/thumbnail.types';

/**
 * 프로페셔널 템플릿: 비즈니스/교육 콘텐츠용 정갈한 스타일
 */
export const professionalTemplate: Template = {
  id: 'professional',
  name: '프로페셔널',
  style: 'professional',
  description: '비즈니스와 교육 콘텐츠에 적합한 전문적인 디자인',
  background: {
    type: 'solid',
    colors: ['#FFFFFF'],
  },
  textLayout: {
    position: 'center',
    alignment: 'left',
    maxWidth: 1000,
    padding: {
      top: 120,
      right: 140,
      bottom: 120,
      left: 140,
    },
  },
  textStyle: {
    fontFamily: 'Pretendard',
    fontSize: 68,
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 1.3,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#3B82F6',
      position: { x: 70, y: 360 },
      size: { width: 8, height: 200 },
      rotation: 0,
    },
  ],
};

/**
 * 프로페셔널 템플릿 - 네이비 버전
 */
export const professionalNavyTemplate: Template = {
  ...professionalTemplate,
  id: 'professional-navy',
  name: '프로페셔널 (네이비)',
  background: {
    type: 'solid',
    colors: ['#1E3A8A'],
  },
  textStyle: {
    ...professionalTemplate.textStyle,
    color: '#FFFFFF',
    fontFamily: 'Noto Sans KR',
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#60A5FA',
      position: { x: 1210, y: 360 },
      size: { width: 8, height: 200 },
      rotation: 0,
    },
  ],
};

/**
 * 프로페셔널 템플릿 - 그레이 버전
 */
export const professionalGrayTemplate: Template = {
  ...professionalTemplate,
  id: 'professional-gray',
  name: '프로페셔널 (그레이)',
  background: {
    type: 'gradient',
    colors: ['#F3F4F6', '#E5E7EB'],
    angle: 180,
  },
  textStyle: {
    ...professionalTemplate.textStyle,
    color: '#111827',
    fontFamily: 'Roboto',
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#EF4444',
      position: { x: 70, y: 360 },
      size: { width: 8, height: 200 },
      rotation: 0,
    },
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#EF4444',
      position: { x: 1210, y: 360 },
      size: { width: 8, height: 200 },
      rotation: 0,
    },
  ],
};

/**
 * 프로페셔널 템플릿 - 블루 그라디언트 버전
 */
export const professionalBlueGradientTemplate: Template = {
  ...professionalTemplate,
  id: 'professional-blue-gradient',
  name: '프로페셔널 (블루 그라디언트)',
  background: {
    type: 'gradient',
    colors: ['#0F172A', '#1E40AF'],
    angle: 135,
  },
  textStyle: {
    ...professionalTemplate.textStyle,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 64,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#3B82F6',
      position: { x: 100, y: 100 },
      size: { width: 6, height: 520 },
      rotation: 0,
    },
  ],
};

/**
 * 프로페셔널 템플릿 - 골드 악센트 버전
 */
export const professionalGoldTemplate: Template = {
  ...professionalTemplate,
  id: 'professional-gold',
  name: '프로페셔널 (골드)',
  background: {
    type: 'solid',
    colors: ['#FAFAF9'],
  },
  textStyle: {
    ...professionalTemplate.textStyle,
    color: '#292524',
    fontFamily: 'Pretendard',
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#F59E0B',
      position: { x: 640, y: 80 },
      size: { width: 200, height: 6 },
      rotation: 0,
    },
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#F59E0B',
      position: { x: 640, y: 640 },
      size: { width: 200, height: 6 },
      rotation: 0,
    },
  ],
};

// 프로페셔널 템플릿 모음
export const professionalTemplates: Template[] = [
  professionalTemplate,
  professionalNavyTemplate,
  professionalGrayTemplate,
  professionalBlueGradientTemplate,
  professionalGoldTemplate,
];
