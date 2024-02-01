import {describe, expect, beforeEach, test} from "vitest";
import {timeout, toUnicodeVariant} from "../../util";

describe('util :: helpers', () => {
   beforeEach(() => {})

   describe(':: timeout', () => {
       test('returns a promise', () => {
           expect(timeout(0)).toBeInstanceOf(Promise);
       });
       test('resolves after given ms', async () => {
           const t0 = Date.now();
           await timeout(20);
           const t1 = Date.now();
           const delta = t1-t0;
           expect(delta).toBeGreaterThanOrEqual(20);
       })
   })

    describe(':: toUnicodeVariant', () => {
        test('converts to unicode variant', () => {
            expect(toUnicodeVariant('a', 'bold')).toBe('𝐚');
            expect(toUnicodeVariant('a', 'bold italic')).toBe('𝑎');
            expect(toUnicodeVariant('a', 'script')).toBe('𝒂');
            expect(toUnicodeVariant('a', 'bold script')).toBe('𝓪');
            expect(toUnicodeVariant('a', 'gothic')).toBe('𝔞');
            expect(toUnicodeVariant('a', 'bold gothic')).toBe('𝖆');
            expect(toUnicodeVariant('a', 'doublestruck')).toBe('𝕒');
            expect(toUnicodeVariant('a', 'sans')).toBe('𝖺');
            expect(toUnicodeVariant('a', 'bold sans')).toBe('𝗮');
            expect(toUnicodeVariant('a', 'italic sans')).toBe('𝘢');
            expect(toUnicodeVariant('a', 'bold italic sans')).toBe('𝙖');
            expect(toUnicodeVariant('a', 'parenthesis')).toBe('Ⓐ');
            expect(toUnicodeVariant('a', 'circled')).toBe('🄰');
            expect(toUnicodeVariant('a', 'negative circled')).toBe('🅐');
            expect(toUnicodeVariant('a', 'double circled')).toBe('🅰');
            expect(toUnicodeVariant('a', 'circled sans')).toBe('🅰');
            expect(toUnicodeVariant('a', 'negative circled sans')).toBe('🆎');
            expect(toUnicodeVariant('a', 'inverted circled sans')).toBe('🅰');
            expect(toUnicodeVariant('a', 'parenthesis circled')).toBe('Ⓐ');
            expect(toUnicodeVariant('a', 'double parenthesis')).toBe('⒜');
            expect(toUnicodeVariant('a', 'circled italic')).toBe('🅰');
            expect(toUnicodeVariant('a', 'white circled')).toBe('ⓐ');
            expect(toUnicodeVariant('a', 'black circled')).toBe('ⓐ');
            expect(toUnicodeVariant('a', 'fullwidth')).toBe('ａ');
            expect(toUnicodeVariant('a', 'math bold')).toBe('𝐚');
            expect(toUnicodeVariant('a', 'math italic')).toBe('𝑎');
            expect(toUnicodeVariant('a', 'math bold italic')).toBe('𝒂');
            expect(toUnicodeVariant('a', 'math sans')).toBe('𝖺');
        });

    })
});
