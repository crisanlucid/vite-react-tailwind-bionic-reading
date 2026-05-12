import { FC } from 'react';
import { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onClick: () => void;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ theme, onClick }) => (
  <button
    onClick={onClick}
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    className='bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-lg p-2 text-sm leading-none transition-colors duration-150 hover:bg-slate-200 dark:hover:bg-slate-600'
  >
    {theme === 'dark' ? '☀️' : '🌙'}
  </button>
);
