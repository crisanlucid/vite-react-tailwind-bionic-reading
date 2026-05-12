export const MM_PER_PX = 25.4 / 96;

export interface PdfImageLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calcPdfImageLayout(
  elWidth: number,
  elHeight: number,
  pageWidth: number
): PdfImageLayout {
  const width = elWidth * MM_PER_PX;
  const height = elHeight * MM_PER_PX;
  const x = (pageWidth - width) / 2;
  return { x, y: 5, width, height };
}
