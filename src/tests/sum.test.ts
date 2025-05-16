// sum.test.ts

import { expect, test } from 'vitest';

type sumType = (a: number, b: number) => {}

const sum: sumType = (a, b) => {
    return a + b
  }

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})