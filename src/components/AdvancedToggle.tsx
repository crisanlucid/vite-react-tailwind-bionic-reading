import { FC } from 'react';

interface AdvancedToggleProps {
  active: boolean;
  onClick: () => void;
}

export const AdvancedToggle: FC<AdvancedToggleProps> = ({ active, onClick }) => (
  <button
    onClick={onClick}
    aria-label={active ? 'Disable advanced mode' : 'Enable advanced mode'}
    title={active ? 'Advanced mode on' : 'Advanced mode off'}
    className={`rounded-lg p-2 text-sm leading-none transition-colors duration-150
      ${active
        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-500 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-800/50'
        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600'
      }`}
  >
    ✨
  </button>
);
