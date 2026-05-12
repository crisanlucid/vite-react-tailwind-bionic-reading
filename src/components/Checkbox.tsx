import { FC } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <div className='ml-4 inline-block'>
    <input type='checkbox' checked={checked} onChange={onChange} />
    <span className='font-normal'> {label}</span>
  </div>
);
