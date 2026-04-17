import { createContext, useContext } from 'react';

/**
 * Context that exposes the parent dialog's `close` function to descendants.
 *
 * Forms inside `<FormDialog>` or `<ControlledFormDialog>` can grab `close`
 * via `useDialogClose()` and call it from their submit handler — no
 * `onSuccess` prop needed, no render-prop needed.
 *
 * If a form is rendered outside of any dialog, `useDialogClose()` returns a
 * no-op function so the form still works as a stand-alone page.
 */
export const DialogCloseContext = createContext<(() => void) | null>(null);

/**
 * Returns a function that closes the nearest enclosing dialog.
 * Returns a no-op when called outside of a dialog.
 *
 * Usage:
 * ```tsx
 * function MyForm() {
 *   const close = useDialogClose();
 *   const mutation = useCreateThing();
 *
 *   const handleSubmit = (data) => {
 *     mutation.mutate(data, {
 *       onSuccess: () => {
 *         toast({ variant: 'success', title: 'Saved' });
 *         close();
 *       },
 *     });
 *   };
 *   // ...
 * }
 * ```
 */
export function useDialogClose(): () => void {
  return useContext(DialogCloseContext) ?? noop;
}

const noop = () => {
  /* no-op when used outside a dialog */
};
