/**
 * (c) David Konrad 2018-
 * MIT License
 *
 * Javascript function to convert plain text to unicode variants
 *
 * Loosely based on the nodejs monotext CLI utility https://github.com/cpsdqs/monotext
 * (c) cpsdqs 2016
 *
 * For more inspiration see  http://unicode.org/charts/
 *
 */

/*
 * supported unicode variants
 *
 * m: monospace
 * b: bold
 * i: italic
 * c: script (Mathematical Alphanumeric Symbols)
 * g: gothic / fraktur
 * d: double-struck
 * s: sans-serif
 * o: circled text
 * p: parenthesized latin letters
 * q: squared text
 * w: fullwidth
 */

export type TextOpType = number | string | { d: number | string };

interface IObjectElement {
  [key: string]: TextOpType;
}

interface IStructure {
  [key: string]: IObjectElement;
}
interface IVariantOffsets {
  [key: string]: string;
}

interface IOffsets {
  [key: string]: TextOpType[];
}

export const toUnicodeVariant = (str: string, variant: string, flags = '') => {
  const offsets: IOffsets = {
    m: [0x1d670, 0x1d7f6],
    b: [0x1d400, 0x1d7ce],
    i: [0x1d434, 0x00030],
    bi: [0x1d468, 0x00030],
    c: [0x0001d49c, 0x00030],
    bc: [0x1d4d0, 0x00030],
    g: [0x1d504, 0x00030],
    d: [0x1d538, 0x1d7d8],
    bg: [0x1d56c, 0x00030],
    s: [0x1d5a0, 0x1d7e2],
    bs: [0x1d5d4, 0x1d7ec],
    is: [0x1d608, 0x00030],
    bis: [0x1d63c, 0x00030],
    o: [0x24b6, 0x2460],
    on: [0x0001f150, 0x2460],
    p: [0x249c, 0x2474],
    q: [0x1f130, 0x00030],
    qn: [0x0001f170, 0x00030],
    w: [0xff21, 0xff10],
    u: [0x2090, 0xff10],
  };

  const variantOffsets: IVariantOffsets = {
    monospace: 'm',
    bold: 'b',
    italic: 'i',
    'bold italic': 'bi',
    script: 'c',
    'bold script': 'bc',
    gothic: 'g',
    'gothic bold': 'bg',
    doublestruck: 'd',
    sans: 's',
    'bold sans': 'bs',
    'italic sans': 'is',
    'bold italic sans': 'bis',
    parenthesis: 'p',
    circled: 'o',
    'circled negative': 'on',
    squared: 'q',
    'squared negative': 'qn',
    fullwidth: 'w',
  };

  // special characters (absolute values)
  const special: IStructure = {
    m: {
      ' ': 0x2000,
      '-': 0x2013,
    },
    i: {
      h: 0x210e,
    },
    g: {
      C: 0x212d,
      H: 0x210c,
      I: 0x2111,
      R: 0x211c,
      Z: 0x2128,
    },
    d: {
      C: 0x2102,
      H: 0x210d,
      N: 0x2115,
      P: 0x2119,
      Q: 0x211a,
      R: 0x211d,
      Z: 0x2124,
    },
    o: {
      0: 0x24ea,
      1: 0x2460,
      2: 0x2461,
      3: 0x2462,
      4: 0x2463,
      5: 0x2464,
      6: 0x2465,
      7: 0x2466,
      8: 0x2467,
      9: 0x2468,
    },
    on: {},
    p: {},
    q: {},
    qn: {},
    w: {},
  };
  //support for parenthesized latin letters small cases
  //support for full width latin letters small cases
  //support for circled negative letters small cases
  //support for squared letters small cases
  //support for squared letters negative small cases
  ['p', 'w', 'on', 'q', 'qn'].forEach((t) => {
    for (let i = 97; i <= 122; i++) {
      special[t as keyof IStructure][String.fromCharCode(i) as keyof IStructure] =
        Number(offsets[t as keyof IOffsets][0]) + (i - 97);
    }
  });

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const getType = (variant: string): string => {
    if (variantOffsets[variant]) return variantOffsets[variant as keyof IVariantOffsets];
    if (offsets[variant as keyof IOffsets]) return variant;
    return 'm'; //monospace as default
  };

  const getFlag = (flag: string, flags: string): boolean => {
    if (!flags) return false;
    return flag.split('|').some((f) => flags.split(',').indexOf(f) > -1);
  };

  const type = getType(variant);
  const underline = getFlag('underline|u', flags);
  const strike = getFlag('strike|s', flags);
  let result = '';

  for (let c of str) {
    let index;
    if (special[type as keyof IStructure] && special[type][c])
      c = String.fromCodePoint(special[type][c] as number);
    if (type && (index = chars.indexOf(c)) > -1) {
      result += String.fromCodePoint(index + (offsets[type][0] as number));
    } else if (type && (index = numbers.indexOf(c)) > -1) {
      result += String.fromCodePoint(index + (offsets[type][1] as number));
    } else {
      result += c;
    }
    if (underline) result += '\u0332'; // add combining underline
    if (strike) result += '\u0336'; // add combining strike
  }
  return result;
};
