# Reusable Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract all inline UI elements from `BionicReaderPage.tsx` into four focused, purely presentational components under `src/components/`.

**Architecture:** `BionicReaderPage` remains the sole smart container owning all state and callbacks. Each component accepts only the props it needs and renders the corresponding HTML with the existing Tailwind classes. A barrel `index.ts` keeps imports in the page clean.

**Tech Stack:** React 19, TypeScript 6, Tailwind CSS v4, Vitest (no React Testing Library installed — verification via `npm run typecheck` and `npm run lint`)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/Button.tsx` | Generic button with `primary`/`success` variant |
| Create | `src/components/Textarea.tsx` | Styled textarea, uncontrolled |
| Create | `src/components/Checkbox.tsx` | Checkbox + inline label |
| Create | `src/components/ReadOutput.tsx` | Bionic text output `<p>`, ref-forwarded |
| Create | `src/components/index.ts` | Barrel re-export |
| Modify | `src/pages/BionicReaderPage.tsx` | Replace inline elements with component imports |

---

### Task 1: Button component

**Files:**
- Create: `src/components/Button.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.tsx
git commit -m "feat(components): add Button with primary/success variant"
```

---

### Task 2: Textarea component

**Files:**
- Create: `src/components/Textarea.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { FC } from 'react';

interface TextareaProps {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
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
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Textarea.tsx
git commit -m "feat(components): add Textarea component"
```

---

### Task 3: Checkbox component

**Files:**
- Create: `src/components/Checkbox.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Checkbox.tsx
git commit -m "feat(components): add Checkbox component"
```

---

### Task 4: ReadOutput component

**Files:**
- Create: `src/components/ReadOutput.tsx`

- [ ] **Step 1: Create the file**

`React.forwardRef` is required so `BionicReaderPage` can pass `inputRef` to the underlying `<p>` for PDF export via `html-to-image`.

```tsx
import React from 'react';

interface ReadOutputProps {
  pretext: string;
  listPrepText: React.ReactElement[];
}

export const ReadOutput = React.forwardRef<HTMLParagraphElement, ReadOutputProps>(
  ({ pretext, listPrepText }, ref) => (
    <p
      ref={ref}
      className='whitespace-pre-wrap break-all basis-11/12 shadow mb-4 px-3 py-1.5'
      id='divToPrint'
    >
      {pretext}
      <span className='t-text'>
        {listPrepText.map((text, i) => (
          <React.Fragment key={i}>{text} </React.Fragment>
        ))}
      </span>
    </p>
  )
);

ReadOutput.displayName = 'ReadOutput';
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ReadOutput.tsx
git commit -m "feat(components): add ReadOutput with forwarded ref"
```

---

### Task 5: Barrel export

**Files:**
- Create: `src/components/index.ts`

- [ ] **Step 1: Create the file**

```ts
export { Button } from './Button';
export { Checkbox } from './Checkbox';
export { ReadOutput } from './ReadOutput';
export { Textarea } from './Textarea';
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/index.ts
git commit -m "feat(components): add barrel index"
```

---

### Task 6: Wire components into BionicReaderPage

**Files:**
- Modify: `src/pages/BionicReaderPage.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
import React, { FC, useState, useRef } from 'react';

import { useTextProcessing } from '../hooks/useTextProcessing';
import { Button, Checkbox, ReadOutput, Textarea } from '../components';

import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const FILE_PDF_NAME = 'download.pdf';

export const BionicReaderPage: FC = () => {
  const [isUnicode, setIsUnicode] = useState(false);
  const { listPrepText, isDisabled, onClickButton, onChangeTextarea, pretext } =
    useTextProcessing(isUnicode);
  const inputRef = useRef<HTMLParagraphElement>(null);

  const printDocument = () => {
    toPng(inputRef.current as HTMLElement, { backgroundColor: '#ffffff' })
      .then((imgData) => {
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 'PNG', 5, 0, width - 10, 0);
        pdf.save(FILE_PDF_NAME);
      })
      .catch((e) => console.error(e));
  };

  const onConvertToUnicodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUnicode(e.target.checked);
  };

  return (
    <div className='px-3 py-20 w-screen h-screen bg-gray-500'>
      <div className='mx-auto max-w-xs h-auto min-h-fit sm:max-w-lg md:max-w-4xl rounded-lg shadow bg-white p-4'>
        <h2 className='text-2xl font-bold my-2 text-left'>Bionic Reading</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <section className='text-left py-4'>
            <h3 className='text-lg font-bold pb-4'>Insert Text:</h3>
            <Textarea onChange={onChangeTextarea} />
            <Button variant='primary' disabled={isDisabled} onClick={onClickButton}>
              Convert
            </Button>
            <Checkbox
              checked={isUnicode}
              onChange={onConvertToUnicodeChange}
              label='Convert with Unicode'
            />
          </section>
          <section className='text-left py-4 overflow-hidden flex flex-col'>
            <h3 className='text-lg font-bold pb-4'>Read Section:</h3>
            <ReadOutput ref={inputRef} pretext={pretext} listPrepText={listPrepText} />
            <Button
              variant='success'
              disabled={isDisabled}
              onClick={printDocument}
              className='self-start'
            >
              Download
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Run existing tests to confirm nothing regressed**

```bash
npm run test
```

Expected: all passing (utility tests unaffected by this change).

- [ ] **Step 5: Commit**

```bash
git add src/pages/BionicReaderPage.tsx
git commit -m "refactor(page): replace inline elements with reusable components"
```

---

### Task 7: Final smoke check

- [ ] **Step 1: Start the dev server and verify the app works**

```bash
npm run dev
```

Open `http://localhost:5173/vite-react-tailwind-bionic-reading/` and verify:
- Typing in the textarea and clicking Convert produces bionic text in the Read Section
- The "Convert with Unicode" checkbox toggles unicode mode
- The Download button produces a PDF
- Both buttons appear disabled during the 2-second processing delay

- [ ] **Step 2: Stop the server and run the full build**

```bash
npm run build
```

Expected: no TypeScript or bundler errors.
