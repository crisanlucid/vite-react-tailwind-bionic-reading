import { describe, test, expect } from 'vitest';
import { MM_PER_PX, calcPdfImageLayout } from '../../util/pdfLayout';

describe('util :: pdfLayout', () => {
  test('MM_PER_PX equals 25.4/96', () => {
    expect(MM_PER_PX).toBeCloseTo(25.4 / 96, 10);
  });

  test('converts element pixel dimensions to mm', () => {
    const { width, height } = calcPdfImageLayout(384, 200, 210);
    expect(width).toBeCloseTo(384 * MM_PER_PX, 6);
    expect(height).toBeCloseTo(200 * MM_PER_PX, 6);
  });

  test('centers the image horizontally on the page', () => {
    const pageWidth = 210;
    const { x, width } = calcPdfImageLayout(384, 200, pageWidth);
    expect(x).toBeCloseTo((pageWidth - width) / 2, 6);
  });

  test('y offset is always 5mm', () => {
    expect(calcPdfImageLayout(384, 200, 210).y).toBe(5);
  });

  test('wider element reduces horizontal margin', () => {
    const narrow = calcPdfImageLayout(200, 100, 210);
    const wide = calcPdfImageLayout(400, 100, 210);
    expect(wide.x).toBeLessThan(narrow.x);
  });
});
