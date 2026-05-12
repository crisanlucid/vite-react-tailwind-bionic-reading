import type { ChangeEventHandler } from 'react';
import { FC } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <label className='inline-flex items-center gap-2 cursor-pointer text-sm text-slate-500 dark:text-slate-400 font-normal select-none'>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='accent-blue-600 w-4 h-4 cursor-pointer'
    />
    {label}
  </label>
);
