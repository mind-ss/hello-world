import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import type { ThumbnailConfig, DecorativeElement } from '../types/thumbnail.types';
import { wrapTextAccurate } from '../utils/textOptimizer';
import { checkContrast, getAverageColor } from '../utils/contrastChecker';

interface ThumbnailCanvasProps {
  config: ThumbnailConfig;
  scale?: number; // 화면 표시용 스케일
}

export interface ThumbnailCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
  redraw: () => void;
}

/**
 * 썸네일을 캔버스에 렌더링하는 컴포넌트
 */
export const ThumbnailCanvas = forwardRef<ThumbnailCanvasRef, ThumbnailCanvasProps>(
  ({ config, scale = 0.5 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 부모 컴포넌트에서 접근할 수 있도록 ref 노출
    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      redraw: () => drawThumbnail(),
    }));

    useEffect(() => {
      drawThumbnail();
    }, [config]);

    const drawThumbnail = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height, template, title, backgroundImage } = config;

      // 캔버스 클리어
      ctx.clearRect(0, 0, width, height);

      // 1. 배경 그리기
      drawBackground(ctx, width, height, template.background, backgroundImage);

      // 2. 장식 요소 그리기
      template.decorations.forEach((decoration) => {
        drawDecoration(ctx, decoration);
      });

      // 3. 텍스트 그리기
      drawText(ctx, title, template, width, height);
    };

    const drawBackground = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      background: ThumbnailConfig['template']['background'],
      backgroundImage?: string
    ) => {
      if (backgroundImage) {
        // 배경 이미지가 있는 경우
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
        };
      } else if (background.type === 'solid') {
        // 단색 배경
        ctx.fillStyle = background.colors[0];
        ctx.fillRect(0, 0, width, height);
      } else if (background.type === 'gradient') {
        // 그라디언트 배경
        const angle = background.angle || 0;
        const angleRad = (angle * Math.PI) / 180;

        const x0 = width / 2 - (Math.cos(angleRad) * width) / 2;
        const y0 = height / 2 - (Math.sin(angleRad) * height) / 2;
        const x1 = width / 2 + (Math.cos(angleRad) * width) / 2;
        const y1 = height / 2 + (Math.sin(angleRad) * height) / 2;

        const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

        background.colors.forEach((color, index) => {
          const stop = index / (background.colors.length - 1);
          gradient.addColorStop(stop, color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawDecoration = (
      ctx: CanvasRenderingContext2D,
      decoration: DecorativeElement
    ) => {
      ctx.save();

      const { type, position, rotation = 0, color, size, shape, emoji } = decoration;

      ctx.translate(position.x, position.y);
      ctx.rotate((rotation * Math.PI) / 180);

      if (type === 'shape' && shape && size && color) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;

        switch (shape) {
          case 'rectangle':
            ctx.fillRect(-size.width / 2, -size.height / 2, size.width, size.height);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, size.width / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -size.height / 2);
            ctx.lineTo(size.width / 2, size.height / 2);
            ctx.lineTo(-size.width / 2, size.height / 2);
            ctx.closePath();
            ctx.fill();
            break;
        }
      } else if (type === 'emoji' && emoji) {
        ctx.font = '48px sans-serif';
        ctx.fillText(emoji, 0, 0);
      }

      ctx.restore();
    };

    const drawText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      template: ThumbnailConfig['template'],
      canvasWidth: number,
      canvasHeight: number
    ) => {
      const { textStyle, textLayout } = template;

      // 폰트 설정
      const fontWeight = textStyle.fontWeight === 'black' ? '900' : textStyle.fontWeight === 'extrabold' ? '800' : 'bold';
      ctx.font = `${fontWeight} ${textStyle.fontSize}px "${textStyle.fontFamily}"`;
      ctx.textAlign = textLayout.alignment;
      ctx.textBaseline = 'middle';

      // 텍스트 줄바꿈
      const lines = wrapTextAccurate(
        text,
        textLayout.maxWidth,
        textStyle.fontSize,
        textStyle.fontFamily,
        fontWeight
      );

      // 텍스트 위치 계산
      let startY: number;
      const lineHeight = textStyle.fontSize * textStyle.lineHeight;
      const totalHeight = lines.length * lineHeight;

      switch (textLayout.position) {
        case 'top':
          startY = textLayout.padding.top + lineHeight / 2;
          break;
        case 'bottom':
          startY = canvasHeight - textLayout.padding.bottom - totalHeight + lineHeight / 2;
          break;
        case 'center':
        default:
          startY = (canvasHeight - totalHeight) / 2 + lineHeight / 2;
          break;
      }

      let x: number;
      switch (textLayout.alignment) {
        case 'left':
          x = textLayout.padding.left;
          break;
        case 'right':
          x = canvasWidth - textLayout.padding.right;
          break;
        case 'center':
        default:
          x = canvasWidth / 2;
          break;
      }

      // 대비 확인 및 스타일 조정
      const bgColor = template.background.colors[0];
      const avgBgColor = template.background.type === 'gradient'
        ? getAverageColor(template.background.colors)
        : bgColor;
      const contrast = checkContrast(avgBgColor, textStyle.color);

      // 각 줄 그리기
      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;

        // 그림자
        if (textStyle.shadowColor && textStyle.shadowBlur) {
          ctx.shadowColor = textStyle.shadowColor;
          ctx.shadowBlur = textStyle.shadowBlur;
          ctx.shadowOffsetX = textStyle.shadowOffsetX || 0;
          ctx.shadowOffsetY = textStyle.shadowOffsetY || 0;
        }

        // 아웃라인 (대비가 낮으면 자동으로 추가)
        if (textStyle.strokeColor && textStyle.strokeWidth) {
          ctx.strokeStyle = textStyle.strokeColor;
          ctx.lineWidth = textStyle.strokeWidth;
          ctx.strokeText(line, x, y);
        } else if (!contrast.passesAA) {
          // 대비가 낮으면 자동으로 아웃라인 추가
          ctx.strokeStyle = avgBgColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.strokeText(line, x, y);
        }

        // 텍스트 색상
        ctx.fillStyle = textStyle.color;
        ctx.fillText(line, x, y);

        // 그림자 리셋
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      });
    };

    const displayWidth = config.width * scale;
    const displayHeight = config.height * scale;

    return (
      <canvas
        ref={canvasRef}
        width={config.width}
        height={config.height}
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      />
    );
  }
);

ThumbnailCanvas.displayName = 'ThumbnailCanvas';
