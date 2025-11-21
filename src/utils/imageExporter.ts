import type { ExportOptions } from '../types/thumbnail.types';

/**
 * 캔버스를 이미지로 변환하여 다운로드합니다.
 * @param canvas HTML Canvas 요소
 * @param filename 파일명
 * @param options 내보내기 옵션
 */
export async function downloadCanvasAsImage(
  canvas: HTMLCanvasElement,
  filename: string,
  options: ExportOptions
): Promise<void> {
  const { format, quality = 0.95, width, height } = options;

  // 캔버스 크기 조정이 필요한 경우
  let targetCanvas = canvas;
  if (width !== canvas.width || height !== canvas.height) {
    targetCanvas = resizeCanvas(canvas, width, height);
  }

  // 이미지 데이터 생성
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const dataUrl = targetCanvas.toDataURL(mimeType, quality);

  // 다운로드 트리거
  downloadDataUrl(dataUrl, `${filename}.${format}`);
}

/**
 * 캔버스 크기를 조정합니다.
 * @param sourceCanvas 원본 캔버스
 * @param targetWidth 목표 너비
 * @param targetHeight 목표 높이
 * @returns 크기 조정된 새 캔버스
 */
export function resizeCanvas(
  sourceCanvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number
): HTMLCanvasElement {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = targetWidth;
  tempCanvas.height = targetHeight;

  const ctx = tempCanvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  // 고품질 스케일링
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 원본 캔버스를 목표 크기로 그리기
  ctx.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);

  return tempCanvas;
}

/**
 * Data URL을 다운로드합니다.
 * @param dataUrl 이미지 데이터 URL
 * @param filename 파일명
 */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 캔버스를 Blob으로 변환합니다.
 * @param canvas HTML Canvas 요소
 * @param format 이미지 포맷
 * @param quality 품질 (0-1)
 * @returns Blob Promise
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg' = 'png',
  quality: number = 0.95
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    canvas.toBlob(
      (blob) => resolve(blob),
      mimeType,
      quality
    );
  });
}

/**
 * 여러 캔버스를 ZIP 파일로 다운로드합니다.
 * @param canvases 캔버스 배열 (각각 {canvas, filename})
 * @param zipFilename ZIP 파일명
 * @param options 내보내기 옵션
 */
export async function downloadCanvasesAsZip(
  canvases: Array<{ canvas: HTMLCanvasElement; filename: string }>,
  zipFilename: string,
  options: ExportOptions
): Promise<void> {
  // JSZip을 동적으로 임포트
  const JSZip = (await import('jszip')).default;
  const { saveAs } = await import('file-saver');

  const zip = new JSZip();
  const { format, quality = 0.95 } = options;

  // 각 캔버스를 ZIP에 추가
  for (const { canvas, filename } of canvases) {
    const blob = await canvasToBlob(canvas, format, quality);
    if (blob) {
      zip.file(`${filename}.${format}`, blob);
    }
  }

  // ZIP 파일 생성 및 다운로드
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, `${zipFilename}.zip`);
}

/**
 * 캔버스를 Base64 문자열로 변환합니다.
 * @param canvas HTML Canvas 요소
 * @param format 이미지 포맷
 * @param quality 품질 (0-1)
 * @returns Base64 문자열
 */
export function canvasToBase64(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpg' = 'png',
  quality: number = 0.95
): string {
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  return canvas.toDataURL(mimeType, quality);
}

/**
 * Data URL에서 Blob을 생성합니다.
 * @param dataUrl Data URL
 * @returns Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

/**
 * 이미지 URL을 로드하여 Image 객체로 반환합니다.
 * @param url 이미지 URL
 * @returns Image 객체 Promise
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * File 객체를 Data URL로 변환합니다.
 * @param file File 객체
 * @returns Data URL Promise
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
