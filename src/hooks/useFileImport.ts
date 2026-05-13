import { useRef, useState } from 'react';

async function parseTxt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read TXT file'));
    reader.readAsText(file);
  });
}

async function parsePdf(file: File): Promise<string> {
  const [pdfjs, workerUrl] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.mjs?url'),
  ]);
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl.default;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const pages = await Promise.all(
    Array.from({ length: pdf.numPages }, (_, i) =>
      pdf.getPage(i + 1).then((page) => page.getTextContent())
    )
  );
  return pages
    .flatMap((page) => page.items.map((item) => ('str' in item ? item.str : '')))
    .join(' ');
}

async function parseDocx(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.default.extractRawText({ arrayBuffer });
  return result.value;
}

function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const SKIP_TAGS = new Set(['script', 'style', 'pre', 'code']);
  const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      let el = node.parentElement;
      while (el) {
        if (SKIP_TAGS.has(el.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT;
        el = el.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const parts: string[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (text) parts.push(text);
  }
  return parts.join(' ');
}

async function parseEpub(file: File): Promise<string> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  // Read OPF manifest to get spine reading order
  const containerXml = await zip.file('META-INF/container.xml')?.async('string');
  if (!containerXml) throw new Error('Invalid EPUB: missing container.xml');

  const containerDoc = new DOMParser().parseFromString(containerXml, 'text/xml');
  const opfPath = containerDoc.querySelector('rootfile')?.getAttribute('full-path');
  if (!opfPath) throw new Error('Invalid EPUB: missing OPF path');

  const opfXml = await zip.file(opfPath)?.async('string');
  if (!opfXml) throw new Error('Invalid EPUB: missing OPF file');

  const opfDoc = new DOMParser().parseFromString(opfXml, 'text/xml');
  const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';

  // Build id→href map from manifest
  const manifest = new Map<string, string>();
  opfDoc.querySelectorAll('manifest item').forEach((item) => {
    const id = item.getAttribute('id');
    const href = item.getAttribute('href');
    if (id && href) manifest.set(id, href);
  });

  // Follow spine order
  const spineIds = Array.from(opfDoc.querySelectorAll('spine itemref')).map(
    (el) => el.getAttribute('idref') ?? ''
  );

  const chapters = await Promise.all(
    spineIds.map(async (id) => {
      const href = manifest.get(id);
      if (!href) return '';
      const html = await zip.file(opfDir + href)?.async('string');
      return html ? htmlToText(html) : '';
    })
  );

  return chapters.filter(Boolean).join('\n\n');
}

const parsers: Record<string, (file: File) => Promise<string>> = {
  'text/plain': parseTxt,
  'application/pdf': parsePdf,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': parseDocx,
  'application/epub+zip': parseEpub,
};

export function useFileImport(onImport: (text: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const openPicker = () => {
    setImportError(null);
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const parse = parsers[file.type];
    if (!parse) {
      setImportError('Unsupported file type. Please use TXT, PDF, DOCX, or EPUB.');
      return;
    }

    setIsImporting(true);
    setImportError(null);
    try {
      const text = await parse(file);
      onImport(text);
    } catch {
      setImportError('Failed to read file. Please try again.');
    } finally {
      setIsImporting(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return { inputRef, isImporting, importError, openPicker, handleFileChange };
}
