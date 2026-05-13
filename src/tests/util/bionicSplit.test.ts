import { describe, it, expect } from 'vitest';
import { bionicSplit } from '../../util/bionicSplit';

describe('bionicSplit', () => {
  it('returns 0 for empty string length', () => {
    expect(bionicSplit(0)).toBe(0);
  });

  it('returns 0 for single character', () => {
    expect(bionicSplit(1)).toBe(0);
  });

  it('returns 1 for 2-character word', () => {
    expect(bionicSplit(2)).toBe(1);
  });

  it('returns 1 for 3-character word', () => {
    expect(bionicSplit(3)).toBe(1);
  });

  it('returns half for 4-character word', () => {
    expect(bionicSplit(4)).toBe(2);
  });

  it('returns floor half for 5-character word', () => {
    expect(bionicSplit(5)).toBe(2);
  });

  it('returns half for 6-character word', () => {
    expect(bionicSplit(6)).toBe(3);
  });

  it('returns floor half for longer words', () => {
    expect(bionicSplit(10)).toBe(5);
    expect(bionicSplit(11)).toBe(5);
    expect(bionicSplit(12)).toBe(6);
  });
});
