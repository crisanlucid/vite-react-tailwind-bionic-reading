const SKIP_TAGS = new Set(['script', 'style', 'pre', 'code']);

function bionicSplit(len: number): number {
  if (len <= 1) return 0;
  if (len <= 3) return 1;
  return Math.floor(len / 2);
}

function applyBionicToNode(node: Node): void {
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
  // Try XHTML first, fall back to HTML
  let doc = new DOMParser().parseFromString(html, 'application/xhtml+xml');
  if (doc.querySelector('parsererror')) {
    doc = new DOMParser().parseFromString(html, 'text/html');
  }
  Array.from((doc.body ?? doc.documentElement).childNodes).forEach(applyBionicToNode);
  return new XMLSerializer().serializeToString(doc.documentElement ?? doc);
}

export async function exportBionicEpub(file: File): Promise<void> {
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  const containerXml = await zip.file('META-INF/container.xml')?.async('string');
  if (!containerXml) throw new Error('Invalid EPUB: missing container.xml');

  const containerDoc = new DOMParser().parseFromString(containerXml, 'text/xml');
  const opfPath = containerDoc.querySelector('rootfile')?.getAttribute('full-path');
  if (!opfPath) throw new Error('Invalid EPUB: missing OPF path');

  const opfXml = await zip.file(opfPath)?.async('string');
  if (!opfXml) throw new Error('Invalid EPUB: missing OPF file');

  const opfDoc = new DOMParser().parseFromString(opfXml, 'text/xml');
  const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';

  const htmlPaths: string[] = [];
  opfDoc.querySelectorAll('manifest item').forEach((item) => {
    const href = item.getAttribute('href') ?? '';
    const mediaType = item.getAttribute('media-type') ?? '';
    if (mediaType.includes('html')) htmlPaths.push(opfDir + href);
  });

  await Promise.all(
    htmlPaths.map(async (path) => {
      const html = await zip.file(path)?.async('string');
      if (html) zip.file(path, applyBionicToHtml(html));
    })
  );

  const blob = await zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bionic_${file.name}`;
  a.click();
  URL.revokeObjectURL(url);
}
