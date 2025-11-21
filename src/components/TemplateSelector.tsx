import React, { useState } from 'react';
import { Layout, Check } from 'lucide-react';
import type { Template } from '../types/thumbnail.types';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

/**
 * 템플릿 선택 컴포넌트
 */
export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}) => {
  const [expandedStyle, setExpandedStyle] = useState<string | null>(null);

  // 스타일별로 그룹화
  const templatesByStyle = templates.reduce((acc, template) => {
    if (!acc[template.style]) {
      acc[template.style] = [];
    }
    acc[template.style].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  const styleNames: Record<string, string> = {
    minimal: '미니멀',
    dynamic: '다이나믹',
    professional: '프로페셔널',
    impact: '임팩트',
    storytelling: '스토리텔링',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Layout className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">템플릿 선택</h3>
      </div>

      <div className="space-y-3">
        {Object.entries(templatesByStyle).map(([style, styleTemplates]) => (
          <div key={style} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* 스타일 헤더 */}
            <button
              onClick={() => setExpandedStyle(expandedStyle === style ? null : style)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left flex items-center justify-between transition-colors"
            >
              <span className="font-semibold text-gray-800">
                {styleNames[style] || style}
              </span>
              <span className="text-sm text-gray-500">
                {styleTemplates.length}개 템플릿
              </span>
            </button>

            {/* 템플릿 목록 */}
            {(expandedStyle === style || expandedStyle === null) && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-white">
                {styleTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate.id === template.id}
                    onSelect={() => onSelectTemplate(template)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`
        relative p-3 rounded-lg border-2 text-left transition-all
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        }
      `}
    >
      {/* 선택 체크 표시 */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* 템플릿 프리뷰 (미니 캔버스) */}
      <div
        className="w-full aspect-video rounded mb-2 overflow-hidden"
        style={{
          background:
            template.background.type === 'gradient'
              ? `linear-gradient(${template.background.angle || 0}deg, ${template.background.colors.join(', ')})`
              : template.background.colors[0],
        }}
      >
        {/* 텍스트 프리뷰 */}
        <div className="w-full h-full flex items-center justify-center p-2">
          <div
            className="text-center font-bold"
            style={{
              color: template.textStyle.color,
              fontSize: '8px',
              textShadow: template.textStyle.shadowColor
                ? `2px 2px 4px ${template.textStyle.shadowColor}`
                : undefined,
            }}
          >
            Aa
          </div>
        </div>
      </div>

      {/* 템플릿 정보 */}
      <div>
        <h4 className="font-semibold text-sm text-gray-800 mb-1">
          {template.name}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-2">
          {template.description}
        </p>
      </div>

      {/* 색상 인디케이터 */}
      <div className="flex gap-1 mt-2">
        {template.background.colors.slice(0, 3).map((color, index) => (
          <div
            key={index}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </button>
  );
};
