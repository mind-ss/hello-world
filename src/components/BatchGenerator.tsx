import React, { useState } from 'react';
import { Sparkles, Grid3x3, Settings } from 'lucide-react';
import type { Template, BatchGenerationConfig } from '../types/thumbnail.types';
import { generateBatchConfigs } from '../utils/batchGenerator';

interface BatchGeneratorProps {
  templates: Template[];
  title: string;
  onGenerate: (configs: ReturnType<typeof generateBatchConfigs>) => void;
}

/**
 * A/B 테스트 배치 생성 설정 컴포넌트
 */
export const BatchGenerator: React.FC<BatchGeneratorProps> = ({
  templates,
  title,
  onGenerate,
}) => {
  const [count, setCount] = useState<number>(12);
  const [options, setOptions] = useState<BatchGenerationConfig['variationOptions']>({
    templates: true,
    colors: true,
    fonts: true,
    layouts: true,
  });

  const handleGenerate = () => {
    if (!title.trim()) {
      alert('썸네일 제목을 먼저 입력해주세요.');
      return;
    }

    const config: BatchGenerationConfig = {
      title,
      count,
      variationOptions: options,
    };

    const generatedConfigs = generateBatchConfigs(templates, config);
    onGenerate(generatedConfigs);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">A/B 테스트 배치 생성</h3>
      </div>

      <p className="text-sm text-gray-600">
        다양한 버전의 썸네일을 한 번에 생성하여 비교해보세요
      </p>

      {/* 생성 개수 설정 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          생성할 썸네일 개수
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="4"
            max="12"
            step="2"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-2xl font-bold text-blue-600 w-12 text-center">
            {count}
          </span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>4개</span>
          <span>12개</span>
        </div>
      </div>

      {/* 변형 옵션 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            변형 옵션
          </label>
        </div>

        <div className="space-y-2">
          <OptionToggle
            label="템플릿 스타일 변경"
            description="다양한 템플릿 디자인 사용"
            checked={options.templates || false}
            onChange={() => toggleOption('templates')}
          />
          <OptionToggle
            label="색상 조합 변경"
            description="배경 색상 자동 조합"
            checked={options.colors || false}
            onChange={() => toggleOption('colors')}
          />
          <OptionToggle
            label="폰트 종류 변경"
            description="다양한 폰트 스타일 적용"
            checked={options.fonts || false}
            onChange={() => toggleOption('fonts')}
          />
          <OptionToggle
            label="텍스트 레이아웃 변경"
            description="텍스트 위치 및 정렬 변경"
            checked={options.layouts || false}
            onChange={() => toggleOption('layouts')}
          />
        </div>
      </div>

      {/* 생성 버튼 */}
      <button
        onClick={handleGenerate}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <Grid3x3 className="w-5 h-5" />
        {count}개 썸네일 배치 생성
      </button>

      {/* 안내 */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-purple-800">
          💡 <strong>팁:</strong> 모든 옵션을 활성화하면 더 다양한 버전이 생성됩니다!
        </p>
      </div>
    </div>
  );
};

interface OptionToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const OptionToggle: React.FC<OptionToggleProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-800">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>

      <div className="ml-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </label>
  );
};
