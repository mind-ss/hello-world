# YouTube Thumbnail Generator 🎨

유튜브 크리에이터를 위한 웹 기반 썸네일 자동 생성 도구입니다.
여러 디자인 템플릿을 제공하고, A/B 테스트를 위한 다양한 버전의 썸네일을 한 번에 생성할 수 있습니다.

## ✨ 주요 기능

### Phase 1 (완료) ✅

- **9가지 템플릿 (2개 스타일)**
  - 미니멀 (4가지 변형)
  - 임팩트 (5가지 변형)

- **텍스트 자동 최적화**
  - 제목 길이에 따라 자동 폰트 크기 조정
  - 실시간 줄 수 예측 및 경고
  - WCAG 기준 색상 대비 자동 검사
  - 한글/영문 최적화 폰트 제공 (6종)

- **실시간 프리뷰**
  - 입력 즉시 실시간 미리보기
  - 데스크톱/모바일 동시 프리뷰
  - 1280x720px 정확한 유튜브 권장 해상도

- **내보내기 기능**
  - PNG/JPG 형식 지원
  - HD (1280x720) / Full HD (1920x1080) 해상도 선택
  - 원클릭 다운로드

### Phase 2 (완료) ✅

- **24개 템플릿 (5개 스타일)**
  - 미니멀 (4가지 변형)
  - 임팩트 (5가지 변형)
  - 다이나믹 (4가지 변형)
  - 프로페셔널 (5가지 변형)
  - 스토리텔링 (6가지 변형)

- **A/B 테스트 배치 생성**
  - 한 번에 4-12개 썸네일 자동 생성
  - 템플릿, 색상, 폰트, 레이아웃 자동 변형
  - 그리드 뷰로 한눈에 비교
  - 버전 번호 자동 라벨링

- **ZIP 다운로드**
  - 전체 배치를 ZIP 파일로 일괄 다운로드
  - 파일명 자동 생성 (v01, v02, ...)

### Phase 3 (예정)

- [ ] 배경 이미지 업로드 및 크롭
- [ ] 색상 커스터마이징
- [ ] 완전 반응형 디자인

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 🛠️ 기술 스택

- **프론트엔드**: React 18 + TypeScript
- **빌드 툴**: Vite 5
- **스타일링**: Tailwind CSS 3
- **아이콘**: Lucide React
- **이미지 처리**: Canvas API, JSZip, FileSaver.js
- **폰트**: Google Fonts (Noto Sans KR, Pretendard, Black Han Sans, Montserrat, Bebas Neue, Roboto)

## 📁 프로젝트 구조

```
youtube-thumbnail-generator/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── ThumbnailCanvas.tsx
│   │   ├── TextEditor.tsx
│   │   ├── TemplateSelector.tsx
│   │   └── ExportPanel.tsx
│   ├── templates/           # 템플릿 정의
│   │   ├── minimal.ts
│   │   ├── impact.ts
│   │   └── index.ts
│   ├── utils/              # 유틸리티 함수
│   │   ├── textOptimizer.ts
│   │   ├── contrastChecker.ts
│   │   ├── imageExporter.ts
│   │   └── batchGenerator.ts
│   ├── types/              # TypeScript 타입
│   │   └── thumbnail.types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🎯 사용 방법

1. **제목 입력**: 썸네일에 들어갈 텍스트를 입력합니다
2. **템플릿 선택**: 원하는 디자인 스타일을 선택합니다
3. **실시간 확인**: 오른쪽 프리뷰에서 결과를 확인합니다
4. **다운로드**: 원하는 형식과 해상도로 다운로드합니다

## 💡 프로 팁

- 텍스트는 3줄 이하로 유지하세요
- 50자 이하로 작성하는 것을 권장합니다
- 모바일에서도 잘 보이는지 확인하세요
- 대비가 높은 색상을 사용하세요
- 여러 템플릿을 시도해보고 A/B 테스트 하세요

## 📊 성능

- 썸네일 생성: 1초 이내
- 배치 생성 (12개): 2-3초 이내
- ZIP 파일 생성: 5초 이내
- 페이지 로딩: 3초 이내
- 빌드 크기: ~286KB (gzipped: ~90KB)
  - 메인 JS: ~186KB (gzipped: ~59KB)
  - JSZip 라이브러리: ~97KB (gzipped: ~30KB)

## 🔮 향후 계획

- [ ] AI 기반 제목 제안 기능
- [ ] 트렌드 색상 자동 추천
- [ ] 인기 유튜버 스타일 프리셋
- [ ] 썸네일 성과 예측 점수
- [ ] 히스토리 기능 (LocalStorage)

## 📝 라이선스

MIT License

## 🤝 기여

기여는 언제나 환영합니다! Pull Request를 보내주세요.

---

Made with ❤️ for YouTube Creators
