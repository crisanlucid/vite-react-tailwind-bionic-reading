import { FC, RefObject, ChangeEventHandler } from 'react';

interface ImportButtonProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: () => void;
  loading?: boolean;
}

export const ImportButton: FC<ImportButtonProps> = ({ inputRef, onChange, onClick, loading = false }) => (
  <>
    <input
      ref={inputRef}
      type='file'
      accept='.txt,.pdf,.docx'
      className='hidden'
      onChange={onChange}
      aria-label='Import file'
    />
    <button
      onClick={onClick}
      disabled={loading}
      className='bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300
        hover:bg-slate-200 dark:hover:bg-slate-600
        border border-slate-200 dark:border-slate-600
        py-2 px-4 rounded-lg font-semibold text-sm
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        inline-flex items-center gap-2'
    >
      {loading ? (
        <svg className='animate-spin h-4 w-4 shrink-0' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' aria-hidden='true'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
        </svg>
      ) : (
        <svg className='h-4 w-4 shrink-0' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
        </svg>
      )}
      {loading ? 'Importing…' : 'Import file'}
    </button>
  </>
);
