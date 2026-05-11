import { bench, describe } from 'vitest';
import { toUnicodeVariant } from '../../util';
import { toProcessText } from '../../util/toProcessText';

const WORD = 'hello';
const MEDIUM = Array(50).fill('hello world').join(' ');
const LARGE = Array(500).fill('hello world').join(' ');

describe('toUnicodeVariant — bold conversion', () => {
  bench('single word', () => {
    toUnicodeVariant(WORD, 'bold');
  });

  bench('medium text (50 words, one call per word)', () => {
    MEDIUM.split(' ').forEach((w) => toUnicodeVariant(w, 'bold'));
  });

  bench('large text (500 words, one call per word)', () => {
    LARGE.split(' ').forEach((w) => toUnicodeVariant(w, 'bold'));
  });
});

describe('toProcessText — word splitting (CSS mode baseline)', () => {
  bench('large text (500 words)', () => {
    toProcessText(LARGE);
  });
});
