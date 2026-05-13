/**
 * Returns the number of characters to bold at the start of a word.
 * ≤1 char → 0 (no bolding), 2–3 chars → 1, ≥4 chars → first half.
 */
export function bionicSplit(len: number): number {
  if (len <= 1) return 0;
  if (len <= 3) return 1;
  return Math.floor(len / 2);
}
