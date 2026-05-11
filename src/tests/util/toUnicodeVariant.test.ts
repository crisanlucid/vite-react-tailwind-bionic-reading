import { describe, expect, test } from 'vitest';
import { toUnicodeVariant } from '../../util';

describe('util :: toUnicodeVariant', () => {
  describe('variants using module-level special-char init (forEach loop)', () => {
    test('parenthesis: lowercase letters', () => {
      expect(toUnicodeVariant('a', 'parenthesis')).toBe('⒜');
      expect(toUnicodeVariant('z', 'parenthesis')).toBe('⒵');
    });

    test('fullwidth: lowercase letters', () => {
      expect(toUnicodeVariant('a', 'fullwidth')).toBe('Ａ');
      expect(toUnicodeVariant('z', 'fullwidth')).toBe('Ｚ');
    });

    test('circled negative: lowercase letters', () => {
      expect(toUnicodeVariant('a', 'circled negative')).toBe('🅐');
      expect(toUnicodeVariant('z', 'circled negative')).toBe('🅩');
    });

    test('squared: lowercase letters', () => {
      expect(toUnicodeVariant('a', 'squared')).toBe('🄰');
      expect(toUnicodeVariant('z', 'squared')).toBe('🅉');
    });

    test('squared negative: lowercase letters', () => {
      expect(toUnicodeVariant('a', 'squared negative')).toBe('🅰');
      expect(toUnicodeVariant('z', 'squared negative')).toBe('🆉');
    });
  });

  describe('special characters (absolute values)', () => {
    test('monospace: space and dash', () => {
      expect(toUnicodeVariant(' ', 'monospace')).toBe(' ');
      expect(toUnicodeVariant('-', 'monospace')).toBe('–');
    });

    test('italic: planck constant h', () => {
      expect(toUnicodeVariant('h', 'italic')).toBe('ℎ');
    });

    test('doublestruck: special uppercase letters', () => {
      expect(toUnicodeVariant('C', 'doublestruck')).toBe('ℂ');
      expect(toUnicodeVariant('N', 'doublestruck')).toBe('ℕ');
    });
  });

  describe('flags', () => {
    test('underline flag appends combining underline', () => {
      const result = toUnicodeVariant('a', 'bold', 'underline');
      expect(result).toBe('𝐚̲');
    });

    test('strike flag appends combining strikethrough', () => {
      const result = toUnicodeVariant('a', 'bold', 'strike');
      expect(result).toBe('𝐚̶');
    });
  });

  describe('multi-character strings', () => {
    test('converts every character in a word', () => {
      expect(toUnicodeVariant('hi', 'bold')).toBe('𝐡𝐢');
    });

    test('passes through characters with no mapping unchanged', () => {
      expect(toUnicodeVariant('!', 'bold')).toBe('!');
    });
  });
});
