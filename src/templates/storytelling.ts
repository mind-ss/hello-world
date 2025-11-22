import type { Template } from '../types/thumbnail.types';

/**
 * 스토리텔링 템플릿: 이미지 중심에 텍스트 오버레이
 */
export const storytellingTemplate: Template = {
  id: 'storytelling',
  name: '스토리텔링',
  style: 'storytelling',
  description: '이미지 위에 텍스트를 오버레이하여 스토리를 전달하는 디자인',
  background: {
    type: 'gradient',
    colors: ['#000000', '#434343'],
    angle: 0,
  },
  textLayout: {
    position: 'bottom',
    alignment: 'center',
    maxWidth: 1100,
    padding: {
      top: 50,
      right: 90,
      bottom: 80,
      left: 90,
    },
  },
  textStyle: {
    fontFamily: 'Pretendard',
    fontSize: 72,
    fontWeight: 'black',
    color: '#FFFFFF',
    strokeColor: '#000000',
    strokeWidth: 4,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowBlur: 20,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    lineHeight: 1.2,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: 'rgba(0, 0, 0, 0.5)',
      position: { x: 640, y: 600 },
      size: { width: 1280, height: 240 },
      rotation: 0,
    },
  ],
};

/**
 * 스토리텔링 템플릿 - 상단 버전
 */
export const storytellingTopTemplate: Template = {
  ...storytellingTemplate,
  id: 'storytelling-top',
  name: '스토리텔링 (상단)',
  textLayout: {
    ...storytellingTemplate.textLayout,
    position: 'top',
    padding: {
      top: 80,
      right: 90,
      bottom: 50,
      left: 90,
    },
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: 'rgba(0, 0, 0, 0.6)',
      position: { x: 640, y: 120 },
      size: { width: 1280, height: 240 },
      rotation: 0,
    },
  ],
};

/**
 * 스토리텔링 템플릿 - 센터 버전
 */
export const storytellingCenterTemplate: Template = {
  ...storytellingTemplate,
  id: 'storytelling-center',
  name: '스토리텔링 (중앙)',
  background: {
    type: 'gradient',
    colors: ['#2C3E50', '#3498DB'],
    angle: 180,
  },
  textLayout: {
    ...storytellingTemplate.textLayout,
    position: 'center',
    padding: {
      top: 100,
      right: 90,
      bottom: 100,
      left: 90,
    },
  },
  textStyle: {
    ...storytellingTemplate.textStyle,
    fontFamily: 'Black Han Sans',
    fontSize: 84,
    strokeWidth: 5,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: 'rgba(0, 0, 0, 0.7)',
      position: { x: 640, y: 360 },
      size: { width: 1200, height: 300 },
      rotation: 0,
    },
  ],
};

/**
 * 스토리텔링 템플릿 - 밝은 버전
 */
export const storytellingLightTemplate: Template = {
  ...storytellingTemplate,
  id: 'storytelling-light',
  name: '스토리텔링 (라이트)',
  background: {
    type: 'gradient',
    colors: ['#FFEAA7', '#FDCB6E'],
    angle: 135,
  },
  textStyle: {
    ...storytellingTemplate.textStyle,
    color: '#2D3436',
    strokeColor: '#FFFFFF',
    strokeWidth: 6,
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Bebas Neue',
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: 'rgba(255, 255, 255, 0.4)',
      position: { x: 640, y: 600 },
      size: { width: 1280, height: 240 },
      rotation: 0,
    },
  ],
};

/**
 * 스토리텔링 템플릿 - 영화 스타일 버전
 */
export const storytellingCinematicTemplate: Template = {
  ...storytellingTemplate,
  id: 'storytelling-cinematic',
  name: '스토리텔링 (시네마틱)',
  background: {
    type: 'solid',
    colors: ['#000000'],
  },
  textLayout: {
    ...storytellingTemplate.textLayout,
    position: 'center',
  },
  textStyle: {
    ...storytellingTemplate.textStyle,
    fontFamily: 'Montserrat',
    fontSize: 68,
    color: '#FFD700',
    strokeColor: '#000000',
    strokeWidth: 3,
  },
  decorations: [
    // 상단 블랙 바
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#000000',
      position: { x: 640, y: 60 },
      size: { width: 1280, height: 120 },
      rotation: 0,
    },
    // 하단 블랙 바
    {
      type: 'shape',
      shape: 'rectangle',
      color: '#000000',
      position: { x: 640, y: 660 },
      size: { width: 1280, height: 120 },
      rotation: 0,
    },
  ],
};

/**
 * 스토리텔링 템플릿 - 그라디언트 오버레이 버전
 */
export const storytellingGradientTemplate: Template = {
  ...storytellingTemplate,
  id: 'storytelling-gradient',
  name: '스토리텔링 (그라디언트)',
  background: {
    type: 'gradient',
    colors: ['#DA22FF', '#9733EE'],
    angle: 45,
  },
  textStyle: {
    ...storytellingTemplate.textStyle,
    fontFamily: 'Noto Sans KR',
    fontSize: 76,
  },
  decorations: [
    {
      type: 'shape',
      shape: 'rectangle',
      color: 'rgba(0, 0, 0, 0.6)',
      position: { x: 640, y: 360 },
      size: { width: 1280, height: 720 },
      rotation: 0,
    },
  ],
};

// 스토리텔링 템플릿 모음
export const storytellingTemplates: Template[] = [
  storytellingTemplate,
  storytellingTopTemplate,
  storytellingCenterTemplate,
  storytellingLightTemplate,
  storytellingCinematicTemplate,
  storytellingGradientTemplate,
];
