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
}

export const Button: FC<ButtonProps> = ({ onClick, disabled, children, variant, className = '' }) => (
  <button
    className={`${variantClasses[variant]} text-gray-100 py-2 px-4 rounded ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
