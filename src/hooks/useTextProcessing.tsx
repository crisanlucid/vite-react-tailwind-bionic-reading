/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { timeout, toUnicodeVariant } from '../util';

export const useTextProcessing = (isUnicode: boolean) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [text, setText] = useState('');
  const [pretext, setPretext] = useState('');
  const [listPrepText, setListPrepText] = useState([] as JSX.Element[]);

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e?.target.value);
  };

  const processData = () => {
    const prepText = text.split(' ');
    console.log(prepText);

    const listText = prepText.map((elem, index) => {
      let preElem = elem;
      let showNewLine = false;
      const match = /\r|\n/.exec(elem);
      if (match) {
        preElem = elem.trim();
        showNewLine = true;
      }

      const mid = Math.floor(preElem.length / 2);

      return (
        <>
          {showNewLine && (
            <>
              <br />
              <br />
            </>
          )}
          {isUnicode ? (
            <span key={index}>{toUnicodeVariant(preElem.slice(0, mid), 'bold')}</span>
          ) : (
            <span key={index} className='bio-letter'>
              {preElem.slice(0, mid)}
            </span>
          )}
          {preElem.slice(mid)}
        </>
      );
    });

    return listText;
  };

  const onClickButton = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    setPretext('processing...');
    setListPrepText([]);

    console.log('wait...', { e });
    setIsDisabled(true);

    const listPrepText = processData();
    setPretext('processing...');

    await timeout(2000);

    setIsDisabled(false);
    setListPrepText(listPrepText);
    setPretext('');
    console.log('done...');
  };

  return {
    listPrepText,
    pretext,
    isDisabled,
    onClickButton,
    processData,
    onChangeTextarea,
  };
};
