import React from 'react';

interface ReadOutputProps {
  pretext: string;
  listPrepText: React.ReactElement[];
  className?: string;
}

export const ReadOutput = React.forwardRef<HTMLParagraphElement, ReadOutputProps>(
  ({ pretext, listPrepText, className = '' }, ref) => (
    <p
      ref={ref}
      className={`whitespace-pre-wrap break-words leading-relaxed
        bg-slate-50 dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-lg shadow-sm px-3 py-2
        text-slate-600 dark:text-slate-300 ${className}`}
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
