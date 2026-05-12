import { FC } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <label className='ml-4 inline-flex items-center gap-1 font-normal cursor-pointer'>
    <input type='checkbox' checked={checked} onChange={onChange} />
    {label}
  </label>
);
