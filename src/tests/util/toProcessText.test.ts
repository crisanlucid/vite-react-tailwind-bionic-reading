import {describe, expect, beforeEach, test} from "vitest";
import {toProcessText} from "../../util/toProcessText";

describe('util :: toProcessText', () => {
   beforeEach(() => {})

    // []
   test('it returns an array', () => {
       const result = toProcessText('text');
       expect(result).toBeInstanceOf(Array);
       expect(result[0]).toBeInstanceOf(Array);
   });

   // [['lor','em']]
    test('it splits a word into its bionic segments', () => {
        expect(toProcessText('fiver')).toMatchObject([
            ['fiv','er']
        ]);
        expect(toProcessText('four')).toMatchObject([
            ['fo','ur']
        ]);
        expect(toProcessText('two')).toMatchObject([
            ['t','wo']
        ]);
        expect(toProcessText('to')).toMatchObject([
            ['t','o']
        ]);
        expect(toProcessText('a')).toMatchObject([
            ['','a']
        ]);
    });

    test('it splits multiple words into its bionic segments', () => {
        expect(toProcessText('lorem ipsum dolor sit amet')).toMatchObject([
            ['lor','em'],
            ['ips','um'],
            ['dol','or'],
            ['s','it'],
            ['am','et']
        ]);
    });

    test('it restores whitespaces', () => {

    })

});
