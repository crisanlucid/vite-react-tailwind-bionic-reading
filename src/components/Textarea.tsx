import type { ChangeEventHandler } from 'react';
import { FC } from 'react';

interface TextareaProps {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  className?: string;
}

export const Textarea: FC<TextareaProps> = ({ onChange, value, className = '' }) => (
  <textarea
    className={`block w-full px-3 py-2
      text-base font-normal text-slate-900 dark:text-slate-100
      bg-slate-50 dark:bg-slate-950
      border border-slate-200 dark:border-slate-700
      rounded-lg
      placeholder-slate-400
      transition-colors duration-150
      resize-none
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    name='text'
    aria-label='empty textarea'
    placeholder='Paste your text here…'
    onChange={onChange}
    value={value}
  />
);
