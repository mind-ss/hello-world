import React, { useState, useRef, useEffect } from 'react';
import { Download, Grid3x3, X } from 'lucide-react';
import { ThumbnailCanvas, type ThumbnailCanvasRef } from './ThumbnailCanvas';
import type { ThumbnailConfig } from '../types/thumbnail.types';
import { downloadCanvasesAsZip } from '../utils/imageExporter';
import { generateVersionedFilename } from '../utils/batchGenerator';

interface BatchPreviewProps {
  thumbnails: ThumbnailConfig[];
  baseFilename: string;
  onClose: () => void;
}

/**
 * A/B 테스트 배치 썸네일 프리뷰 컴포넌트
 */
export const BatchPreview: React.FC<BatchPreviewProps> = ({
  thumbnails,
  baseFilename,
  onClose,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const canvasRefs = useRef<(ThumbnailCanvasRef | null)[]>([]);

  // Canvas refs 초기화
  useEffect(() => {
    canvasRefs.current = canvasRefs.current.slice(0, thumbnails.length);
  }, [thumbnails.length]);

  const handleDownloadAll = async () => {
    setIsDownloading(true);

    try {
      const canvases = canvasRefs.current
        .map((ref, index) => {
          const canvas = ref?.getCanvas();
          if (!canvas) return null;

          const filename = generateVersionedFilename(baseFilename, index + 1);
          return { canvas, filename };
        })
        .filter((item): item is { canvas: HTMLCanvasElement; filename: string } => item !== null);

      if (canvases.length === 0) {
        alert('다운로드할 썸네일이 없습니다.');
        return;
      }

      await downloadCanvasesAsZip(
        canvases,
        `${baseFilename}_batch`,
        {
          format: 'png',
          width: 1280,
          height: 720,
        }
      );
    } catch (error) {
      console.error('Download error:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <Grid3x3 className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                A/B 테스트 배치 프리뷰
              </h2>
              <p className="text-sm text-gray-600">
                {thumbnails.length}개 버전 생성됨
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 그리드 컨테이너 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {thumbnails.map((config, index) => (
              <ThumbnailCard
                key={index}
                config={config}
                versionNumber={index + 1}
                ref={(el) => (canvasRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>모든 썸네일을 PNG 형식으로 다운로드합니다</p>
              <p className="text-xs mt-1">파일명: {baseFilename}_v01.png ~ v{thumbnails.length.toString().padStart(2, '0')}.png</p>
            </div>

            <button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              className={`
                px-6 py-3 rounded-lg font-semibold text-white transition-all
                flex items-center gap-2
                ${
                  isDownloading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }
              `}
            >
              <Download className="w-5 h-5" />
              {isDownloading ? 'ZIP 생성 중...' : 'ZIP 다운로드'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ThumbnailCardProps {
  config: ThumbnailConfig;
  versionNumber: number;
}

const ThumbnailCard = React.forwardRef<ThumbnailCanvasRef, ThumbnailCardProps>(
  ({ config, versionNumber }, ref) => {
    return (
      <div className="relative group">
        {/* 버전 번호 배지 */}
        <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          v{versionNumber.toString().padStart(2, '0')}
        </div>

        {/* 캔버스 */}
        <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
          <ThumbnailCanvas
            ref={ref}
            config={config}
            scale={0.2}
          />

          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
        </div>

        {/* 템플릿 정보 */}
        <div className="mt-2 text-xs text-center">
          <p className="font-medium text-gray-700">{config.template.name}</p>
          <p className="text-gray-500">{config.template.style}</p>
        </div>
      </div>
    );
  }
);

ThumbnailCard.displayName = 'ThumbnailCard';
