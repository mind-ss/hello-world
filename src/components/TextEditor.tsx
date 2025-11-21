import React, { useState, useEffect } from 'react';
import { Type, AlertCircle } from 'lucide-react';
import { optimizeText } from '../utils/textOptimizer';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxWidth?: number;
}

/**
 * 텍스트 입력 및 편집 컴포넌트
 */
export const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  maxWidth = 1100,
}) => {
  const [charCount, setCharCount] = useState(0);
  const [showWarnings, setShowWarnings] = useState(false);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // 텍스트 최적화 분석
  const optimization = optimizeText(value, maxWidth);
  const hasWarnings = optimization.needsAdjustment;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Type className="w-5 h-5" />
          썸네일 제목
        </label>
        <span
          className={`text-sm font-medium ${
            charCount > 50 ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {charCount} / 50자
        </span>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="예: 초보자도 쉽게 따라하는 유튜브 썸네일 만들기"
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          rows={3}
          style={{
            fontFamily: 'Pretendard, sans-serif',
          }}
        />

        {hasWarnings && (
          <button
            onClick={() => setShowWarnings(!showWarnings)}
            className="absolute top-3 right-3 p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
            title="경고 보기"
          >
            <AlertCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 경고 메시지 */}
      {showWarnings && hasWarnings && optimization.suggestions && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-800 mb-2">
                텍스트 최적화 제안
              </h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                {optimization.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 텍스트 분석 정보 */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium">예상 줄 수:</span>
          <span
            className={`px-2 py-1 rounded ${
              optimization.lineCount <= 3
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {optimization.lineCount}줄
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">권장 폰트 크기:</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {optimization.fontSize}px
          </span>
        </div>
      </div>

      {/* 텍스트 프리뷰 */}
      {value && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-xs font-medium text-gray-500 mb-2">
            줄바꿈 프리뷰
          </div>
          <div className="space-y-1">
            {optimization.lines.map((line, index) => (
              <div key={index} className="text-sm text-gray-700 font-medium">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
