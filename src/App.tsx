import { useState, useRef } from 'react';
import { Youtube, Sparkles } from 'lucide-react';
import { ThumbnailCanvas, type ThumbnailCanvasRef } from './components/ThumbnailCanvas';
import { TextEditor } from './components/TextEditor';
import { TemplateSelector } from './components/TemplateSelector';
import { ExportPanel } from './components/ExportPanel';
import { allTemplates, getDefaultTemplate } from './templates';
import type { ThumbnailConfig } from './types/thumbnail.types';

function App() {
  const [title, setTitle] = useState('초보자도 쉽게 따라하는 유튜브 썸네일 만들기');
  const [config, setConfig] = useState<ThumbnailConfig>({
    title: '초보자도 쉽게 따라하는 유튜브 썸네일 만들기',
    template: getDefaultTemplate(),
    width: 1280,
    height: 720,
  });

  const canvasRef = useRef<ThumbnailCanvasRef>(null);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setConfig(prev => ({
      ...prev,
      title: newTitle,
    }));
  };

  const handleTemplateChange = (template: typeof config.template) => {
    setConfig(prev => ({
      ...prev,
      template,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  YouTube Thumbnail Generator
                </h1>
                <p className="text-sm text-gray-500">
                  5분 안에 12가지 썸네일 옵션을 만들어보세요
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">무료 도구</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 설정 패널 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 텍스트 입력 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <TextEditor
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            {/* 템플릿 선택 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <TemplateSelector
                templates={allTemplates}
                selectedTemplate={config.template}
                onSelectTemplate={handleTemplateChange}
              />
            </div>

            {/* 내보내기 */}
            <ExportPanel
              canvasRef={canvasRef}
              title={title}
            />
          </div>

          {/* 오른쪽: 프리뷰 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  실시간 프리뷰
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>자동 업데이트</span>
                </div>
              </div>

              {/* 캔버스 컨테이너 */}
              <div className="flex flex-col items-center gap-6">
                {/* 데스크톱 프리뷰 */}
                <div className="w-full">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    데스크톱 버전 (1280x720)
                  </div>
                  <div className="flex justify-center">
                    <ThumbnailCanvas
                      ref={canvasRef}
                      config={config}
                      scale={0.5}
                    />
                  </div>
                </div>

                {/* 모바일 프리뷰 */}
                <div className="w-full">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    모바일 미리보기
                  </div>
                  <div className="flex justify-center">
                    <ThumbnailCanvas
                      config={config}
                      scale={0.25}
                    />
                  </div>
                </div>
              </div>

              {/* 정보 */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">💡 프로 팁</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 모바일에서도 잘 보이는지 확인하세요</li>
                    <li>• 텍스트는 3줄 이하로 유지하세요</li>
                    <li>• 대비가 높은 색상을 사용하세요</li>
                    <li>• A/B 테스트로 여러 버전을 만들어보세요</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>Made with ❤️ for YouTube Creators</p>
            <p className="mt-2">
              © 2024 YouTube Thumbnail Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
