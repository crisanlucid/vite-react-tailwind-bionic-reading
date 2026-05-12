import React, { FC, useState, useRef } from 'react';

import { useTextProcessing } from '../hooks/useTextProcessing';
import { Button, Checkbox, ReadOutput, Textarea } from '../components';

import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const FILE_PDF_NAME = 'download.pdf';

export const BionicReaderPage: FC = () => {
  const [isUnicode, setIsUnicode] = useState(false);
  const { listPrepText, isDisabled, onClickButton, onChangeTextarea, pretext } =
    useTextProcessing(isUnicode);
  const inputRef = useRef<HTMLParagraphElement>(null);

  const printDocument = () => {
    const el = inputRef.current as HTMLElement;
    toPng(el, { backgroundColor: '#ffffff', pixelRatio: 3 })
      .then((imgData) => {
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth() - 10;
        const pdfHeight = (el.offsetHeight / el.offsetWidth) * pdfWidth;
        pdf.addImage(imgData, 'PNG', 5, 0, pdfWidth, pdfHeight);
        pdf.save(FILE_PDF_NAME);
      })
      .catch((e) => console.error(e));
  };

  const onConvertToUnicodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUnicode(e.target.checked);
  };

  return (
    <div className='px-3 py-20 w-screen h-screen bg-gray-500'>
      <div className='mx-auto max-w-xs h-auto min-h-fit sm:max-w-lg md:max-w-4xl rounded-lg shadow bg-white p-4'>
        <h2 className='text-2xl font-bold my-2 text-left'>Bionic Reading</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <section className='text-left py-4'>
            <h3 className='text-lg font-bold pb-4'>Insert Text:</h3>
            <Textarea onChange={onChangeTextarea} />
            <Button variant='primary' disabled={isDisabled} onClick={onClickButton}>
              Convert
            </Button>
            <Checkbox
              checked={isUnicode}
              onChange={onConvertToUnicodeChange}
              label='Convert with Unicode'
            />
          </section>
          <section className='text-left py-4 overflow-hidden flex flex-col'>
            <h3 className='text-lg font-bold pb-4'>Read Section:</h3>
            <ReadOutput ref={inputRef} pretext={pretext} listPrepText={listPrepText} />
            <Button
              variant='success'
              disabled={isDisabled}
              onClick={printDocument}
              className='self-start'
            >
              Download
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};
