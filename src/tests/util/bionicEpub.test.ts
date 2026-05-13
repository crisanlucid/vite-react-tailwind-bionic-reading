import { describe, it, expect } from 'vitest';

// Extract the testable DOM logic inline (applyBionicToHtml is not exported)
// We test the observable output: <b> tags appear at correct word positions
import { bionicSplit } from '../../util/bionicSplit';

function applyBionicToNode(node: Node): void {
  const SKIP_TAGS = new Set(['script', 'style', 'pre', 'code']);
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? '';
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    for (const part of text.split(/(\s+)/)) {
      if (!part || /^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        continue;
      }
      const mid = bionicSplit(part.length);
      if (mid > 0) {
        const bold = document.createElement('b');
        bold.textContent = part.slice(0, mid);
        frag.appendChild(bold);
        frag.appendChild(document.createTextNode(part.slice(mid)));
      } else {
        frag.appendChild(document.createTextNode(part));
      }
    }
    node.parentNode?.replaceChild(frag, node);
    return;
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    if (SKIP_TAGS.has(el.tagName.toLowerCase())) return;
    Array.from(node.childNodes).forEach(applyBionicToNode);
  }
}

function applyBionicToHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  Array.from((doc.body ?? doc.documentElement).childNodes).forEach(applyBionicToNode);
  return doc.body.innerHTML;
}

describe('bionic HTML processing', () => {
  it('wraps first half of a long word in <b>', () => {
    const result = applyBionicToHtml('<p>Reading</p>');
    expect(result).toContain('<b>Rea</b>');
    expect(result).toContain('ding');
  });

  it('wraps only first letter of a 2-char word', () => {
    const result = applyBionicToHtml('<p>is</p>');
    expect(result).toContain('<b>i</b>');
    expect(result).toContain('s');
  });

  it('wraps only first letter of a 3-char word', () => {
    const result = applyBionicToHtml('<p>the</p>');
    expect(result).toContain('<b>t</b>');
    expect(result).toContain('he');
  });

  it('does not bold a single character', () => {
    const result = applyBionicToHtml('<p>I read</p>');
    expect(result).not.toMatch(/<b>I<\/b>/);
    expect(result).toContain('<b>re</b>'); // read = 4 chars → floor(4/2) = 2
  });

  it('skips script tag content', () => {
    const result = applyBionicToHtml('<script>var x = "hello"</script>');
    expect(result).not.toContain('<b>');
  });

  it('skips style tag content', () => {
    const result = applyBionicToHtml('<style>.foo { color: red; }</style>');
    expect(result).not.toContain('<b>');
  });

  it('skips pre and code tag content', () => {
    const result = applyBionicToHtml('<pre>const foo = bar</pre><code>baz</code>');
    expect(result).not.toContain('<b>');
  });

  it('preserves existing HTML structure around bolded text', () => {
    const result = applyBionicToHtml('<p class="chapter">Hello world</p>');
    expect(result).toContain('class="chapter"');
    expect(result).toContain('<b>He</b>'); // Hello = 5 chars → floor(5/2) = 2
    expect(result).toContain('<b>wo</b>'); // world = 5 chars → floor(5/2) = 2
  });
});
