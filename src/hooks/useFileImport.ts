import { useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

async function parseTxt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read TXT file'));
    reader.readAsText(file);
  });
}

async function parsePdf(file: File): Promise<string> {
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
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

const parsers: Record<string, (file: File) => Promise<string>> = {
  'text/plain': parseTxt,
  'application/pdf': parsePdf,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': parseDocx,
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
      setImportError('Unsupported file type. Please use TXT, PDF, or DOCX.');
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
