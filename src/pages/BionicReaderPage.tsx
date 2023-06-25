import React, { FC, useState, useRef } from 'react';

import { useTextProcessing } from '../hooks/useTextProcessing';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const FILE_PDF_NAME = 'download.pdf';
export const BionicReaderPage: FC = () => {
  const [isUnicode, setIsUnicode] = useState(false);
  const { listPrepText, isDisabled, onClickButton, onChangeTextarea, pretext } =
    useTextProcessing(isUnicode);
  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current as unknown as HTMLElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 'JPEG', 5, 10, width - 10, 0);
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
            <textarea
              className='form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded-lg shadow
              transition
              ease-in-out
              m-0
              mb-4
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              name='text'
              id='controlTextarea'
              cols={30}
              rows={10}
              aria-label='empty textarea'
              placeholder='Empty'
              onChange={onChangeTextarea}
            ></textarea>
            <button
              className='hover:bg-blue-700 bg-blue-600 text-gray-100 py-2 px-4 rounded'
              disabled={isDisabled}
              onClick={onClickButton}
            >
              Convert
            </button>
            <div className='ml-4 inline-block'>
              <input type='checkbox' onChange={onConvertToUnicodeChange} />
              <span className='font-normal'> Convert with Unicode</span>
            </div>
          </section>
          <section className='text-left py-4 overflow-hidden flex flex-col'>
            <h3 className='text-lg font-bold pb-4 '>Read Section:</h3>

            <p
              className='whitespace-pre-wrap break-all basis-11/12 shadow mb-4 px-3
              py-1.5'
              id='divToPrint'
              ref={inputRef}
            >
              {pretext}
              <span className='t-text'>
                {listPrepText.map((text) => (
                  <>{text} </>
                ))}
              </span>
            </p>

            <button
              className='hover:bg-green-700 bg-green-600 text-gray-100 py-2 px-4 rounded self-start '
              disabled={isDisabled}
              onClick={printDocument}
            >
              Download
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
