# Reusable Components Design

**Date:** 2026-05-12  
**Status:** Approved

## Goal

Extract the inline UI elements from `BionicReaderPage.tsx` into small, purely presentational components under `src/components/`. The page remains the sole smart container owning all state and wiring.

## Components

### `Button.tsx`

**Props:**
- `onClick: React.MouseEventHandler<HTMLButtonElement>`
- `disabled: boolean`
- `children: React.ReactNode`
- `variant: 'primary' | 'success'`

**Behavior:** Renders a `<button>` with shared base classes (`py-2 px-4 rounded text-gray-100`) and variant-specific colors:
- `primary` → `bg-blue-600 hover:bg-blue-700`
- `success` → `bg-green-600 hover:bg-green-700`

Layout concerns (e.g., `self-start`) remain at the call site in `BionicReaderPage`.

---

### `Textarea.tsx`

**Props:**
- `onChange: React.ChangeEventHandler<HTMLTextAreaElement>`

**Behavior:** Renders the textarea with its current Tailwind classes and fixed dimensions (`cols={30} rows={10}`). Uncontrolled — no `value` prop needed.

---

### `Checkbox.tsx`

**Props:**
- `checked: boolean`
- `onChange: React.ChangeEventHandler<HTMLInputElement>`
- `label: string`

**Behavior:** Renders `<input type="checkbox">` alongside a `<span>` label inline.

---

### `ReadOutput.tsx`

**Props:**
- `pretext: string`
- `listPrepText: React.ReactElement[]`
- `ref: React.Ref<HTMLParagraphElement>` (forwarded via `React.forwardRef`)

**Behavior:** Renders the `<p>` element with bionic-processed text. The ref is forwarded so `BionicReaderPage` retains access to the DOM node for PDF export via `html-to-image` + `jsPDF`.

---

### `src/components/index.ts`

Barrel re-exporting all four components:

```ts
export { Button } from './Button';
export { Textarea } from './Textarea';
export { Checkbox } from './Checkbox';
export { ReadOutput } from './ReadOutput';
```

## Architecture

```
src/
  components/
    Button.tsx
    Checkbox.tsx
    ReadOutput.tsx
    Textarea.tsx
    index.ts
  pages/
    BionicReaderPage.tsx   ← sole smart container, imports from components barrel
  hooks/
    useTextProcessing.tsx  ← unchanged
```

## What does NOT change

- `useTextProcessing` hook — no modifications
- All state ownership stays in `BionicReaderPage`
- PDF export logic stays in `BionicReaderPage` (uses forwarded ref from `ReadOutput`)
- `src/index.css` — no changes needed
