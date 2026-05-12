import React from 'react';

interface ReadOutputProps {
  pretext: string;
  listPrepText: React.ReactElement[];
}

export const ReadOutput = React.forwardRef<HTMLParagraphElement, ReadOutputProps>(
  ({ pretext, listPrepText }, ref) => (
    <p
      ref={ref}
      className='whitespace-pre-wrap break-all basis-11/12 shadow mb-4 px-3 py-1.5'
    >
      {pretext}
      <span className='t-text'>
        {listPrepText.map((text, i) => (
          <React.Fragment key={i}>{text} </React.Fragment>
        ))}
      </span>
    </p>
  )
);

ReadOutput.displayName = 'ReadOutput';
