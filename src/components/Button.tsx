import React, { FC } from 'react';

type ButtonVariant = 'primary' | 'success';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  success: 'bg-green-600 hover:bg-green-700',
};

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  children: React.ReactNode;
  variant: ButtonVariant;
  className?: string;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  variant,
  className = '',
  loading = false,
}) => (
  <button
    className={`${variantClasses[variant]} text-white py-2 px-5 rounded-lg font-semibold
      transition-colors duration-150
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
      disabled:opacity-50 disabled:cursor-not-allowed
      inline-flex items-center gap-2 ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {loading && (
      <svg
        className='animate-spin h-4 w-4 shrink-0'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
        />
      </svg>
    )}
    {children}
  </button>
);
