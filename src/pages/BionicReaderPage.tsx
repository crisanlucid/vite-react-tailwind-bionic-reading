import React, { FC, useState, useRef } from 'react';

import { useTextProcessing } from '../hooks/useTextProcessing';
import { useTheme } from '../hooks/useTheme';
import { useFileImport } from '../hooks/useFileImport';
import {
  AdvancedToggle,
  Button,
  Checkbox,
  ImportButton,
  ReadOutput,
  Textarea,
  ThemeToggle,
} from '../components';
import { calcPdfImageLayout } from '../util/pdfLayout';

import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const FILE_PDF_NAME = 'download.pdf';

export const BionicReaderPage: FC = () => {
  const [isUnicode, setIsUnicode] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const { listPrepText, isDisabled, onClickButton, onChangeTextarea, pretext, text, setText } =
    useTextProcessing(isUnicode);
  const outputRef = useRef<HTMLParagraphElement>(null);
  const { theme, toggleTheme } = useTheme();

  const { inputRef: fileInputRef, isImporting, importError, openPicker, handleFileChange } =
    useFileImport(setText);

  const printDocument = () => {
    const el = outputRef.current as HTMLElement;
    const backgroundColor = theme === 'dark' ? '#1e293b' : '#f8fafc';
    toPng(el, { backgroundColor, pixelRatio: 3 })
      .then((imgData) => {
        const pdf = new jsPDF();
        const { x, y, width, height } = calcPdfImageLayout(
          el.offsetWidth,
          el.offsetHeight,
          pdf.internal.pageSize.getWidth()
        );
        pdf.addImage(imgData, 'PNG', x, y, width, height);
        pdf.save(FILE_PDF_NAME);
      })
      .catch((e) => console.error(e));
  };

  const onConvertToUnicodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUnicode(e.target.checked);
  };

  return (
    <div className='min-h-screen px-4 py-12 bg-slate-100 dark:bg-slate-950 transition-colors duration-200'>
      <div className='mx-auto max-w-xs sm:max-w-lg md:max-w-4xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8'>
        <div className='flex items-start justify-between mb-1'>
          <div>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
              Bionic Reading
            </h1>
            <p className='text-sm text-slate-500 dark:text-slate-400 mt-0.5'>
              Speed-read with artificial fixation points
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <AdvancedToggle active={isAdvanced} onClick={() => setIsAdvanced((v) => !v)} />
            <ThemeToggle theme={theme} onClick={toggleTheme} />
          </div>
        </div>

        <hr className='my-4 border-slate-200 dark:border-slate-700' />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'>
          <section className='flex flex-col gap-3'>
            <h2 className='text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500'>
              Input
            </h2>
            {isAdvanced && (
              <div className='flex items-center gap-3'>
                <ImportButton
                  inputRef={fileInputRef}
                  onChange={handleFileChange}
                  onClick={openPicker}
                  loading={isImporting}
                />
                <span className='text-xs text-slate-400 dark:text-slate-500'>
                  * Supported formats: TXT, DOCX, PDF, EPUB
                </span>
              </div>
            )}
            {importError && (
              <p className='text-xs text-red-500 dark:text-red-400'>{importError}</p>
            )}
            <Textarea onChange={onChangeTextarea} value={text} className='flex-1 min-h-[220px]' />
            <div className='flex items-center gap-3 flex-wrap'>
              <Button variant='primary' disabled={isDisabled} onClick={onClickButton} loading={isDisabled}>
                Convert
              </Button>
              <Checkbox
                checked={isUnicode}
                onChange={onConvertToUnicodeChange}
                label='Unicode mode'
              />
            </div>
          </section>

          <section className='flex flex-col gap-3'>
            <h2 className='text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500'>
              Output
            </h2>
            <ReadOutput
              ref={outputRef}
              pretext={pretext}
              listPrepText={listPrepText}
              className='flex-1 min-h-[220px]'
            />
            <Button
              variant='success'
              disabled={isDisabled}
              onClick={printDocument}
              className='self-start'
            >
              ↓ Download PDF
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};
