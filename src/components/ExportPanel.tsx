import React, { useState } from 'react';
import { Download, Image as ImageIcon, FileImage } from 'lucide-react';
import type { ExportOptions } from '../types/thumbnail.types';
import type { ThumbnailCanvasRef } from './ThumbnailCanvas';
import { downloadCanvasAsImage } from '../utils/imageExporter';

interface ExportPanelProps {
  canvasRef: React.RefObject<ThumbnailCanvasRef>;
  title: string;
}

/**
 * 내보내기 패널 컴포넌트
 */
export const ExportPanel: React.FC<ExportPanelProps> = ({ canvasRef, title }) => {
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [resolution, setResolution] = useState<'hd' | 'fhd'>('hd');
  const [isDownloading, setIsDownloading] = useState(false);

  const resolutionOptions = {
    hd: { width: 1280, height: 720, label: 'HD (1280x720)' },
    fhd: { width: 1920, height: 1080, label: 'Full HD (1920x1080)' },
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) {
      alert('캔버스를 찾을 수 없습니다.');
      return;
    }

    setIsDownloading(true);

    try {
      const { width, height } = resolutionOptions[resolution];
      const exportOptions: ExportOptions = {
        format,
        quality: format === 'jpg' ? 0.95 : undefined,
        width,
        height,
      };

      const filename = title
        ? title.replace(/[^a-zA-Z0-9가-힣\s]/g, '').replace(/\s+/g, '_').substring(0, 50)
        : 'thumbnail';

      await downloadCanvasAsImage(canvas, filename, exportOptions);
    } catch (error) {
      console.error('Download error:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-2">
        <Download className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">내보내기</h3>
      </div>

      {/* 파일 형식 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          파일 형식
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setFormat('png')}
            className={`
              px-4 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all
              ${
                format === 'png'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }
            `}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="font-medium">PNG</span>
          </button>

          <button
            onClick={() => setFormat('jpg')}
            className={`
              px-4 py-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all
              ${
                format === 'jpg'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }
            `}
          >
            <FileImage className="w-4 h-4" />
            <span className="font-medium">JPG</span>
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          {format === 'png'
            ? 'PNG: 고품질, 투명 배경 지원 (파일 크기 큼)'
            : 'JPG: 작은 파일 크기, 투명 배경 미지원'}
        </p>
      </div>

      {/* 해상도 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          해상도
        </label>
        <div className="space-y-2">
          {Object.entries(resolutionOptions).map(([key, option]) => (
            <button
              key={key}
              onClick={() => setResolution(key as 'hd' | 'fhd')}
              className={`
                w-full px-4 py-3 rounded-lg border-2 text-left transition-all
                ${
                  resolution === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{option.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {option.width} × {option.height} 픽셀
                  </div>
                </div>
                {resolution === key && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <p className="mt-2 text-xs text-gray-500">
          유튜브 권장 해상도: 1280x720 (HD)
        </p>
      </div>

      {/* 다운로드 버튼 */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`
          w-full px-6 py-4 rounded-lg font-semibold text-white transition-all
          flex items-center justify-center gap-2
          ${
            isDownloading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        <Download className="w-5 h-5" />
        {isDownloading ? '다운로드 중...' : '썸네일 다운로드'}
      </button>

      {/* 다운로드 정보 */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• 다운로드된 이미지는 바로 유튜브에 업로드할 수 있습니다.</p>
        <p>• 파일명은 썸네일 제목을 기반으로 자동 생성됩니다.</p>
      </div>
    </div>
  );
};
