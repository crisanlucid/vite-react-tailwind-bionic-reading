import type { ChangeEventHandler } from 'react';
import { FC } from 'react';

interface TextareaProps {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const Textarea: FC<TextareaProps> = ({ onChange }) => (
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
    onChange={onChange}
  />
);
