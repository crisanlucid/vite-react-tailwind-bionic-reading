import React, { FC, useState } from "react";

import { timeout } from "../util/helpers";

export const useTextProcessing = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [text, setText] = useState("");
  const [pretext, setPretext] = useState("");
  const [listPrepText, setListPrepText] = useState([] as JSX.Element[]);

  const onChangeTextare = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e?.target.value);
  };

  const processData = () => {
    const prepText = text.split(" ");
    console.log(prepText);

    const listText = prepText.map((elem) => {
      let preElem = elem;
      let showNewLine = false;
      const match = /\r|\n/.exec(elem);
      if (match) {
        preElem = elem.trim();
        showNewLine = true;
      }

      const mid = Math.floor(preElem.length / 2);

      console.log(preElem.slice(mid));
      return (
        <>
          {showNewLine && (
            <>
              <br />
              <br />
            </>
          )}
          <span className="bio-letter">{preElem.slice(0, mid)}</span>
          {preElem.slice(mid)}
        </>
      );
    });

    return listText;
  };

  const onClickButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setPretext("processing...");
    setListPrepText([]);

    console.log("wait...");
    setIsDisabled(true);

    const listPrepText = processData();
    setPretext("processing...");

    await timeout(2000);

    setIsDisabled(false);
    setListPrepText(listPrepText);
    setPretext("");
    console.log("done...");
  };

  return {
    listPrepText,
    pretext,
    isDisabled,
    onClickButton,
    processData,
    onChangeTextare,
  };
};
