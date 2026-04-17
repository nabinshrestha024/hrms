import { createContext, useContext } from 'react';

/**
 * Context that exposes a generated form id from a parent dialog to descendants.
 *
 * `<FormDialog>` and `<ControlledFormDialog>` call `useId()` and provide the
 * result here. The `<Form>` wrapper from `@erp/ui` reads it and applies it
 * to the inner `<form>` tag — so the dialog's submit button (which uses
 * `form="<id>"`) is automatically wired up. No magic strings.
 *
 * If a `<Form>` is rendered outside any dialog, the context returns
 * `undefined` and the form has no id (or uses its own explicit `id` prop).
 */
export const FormIdContext = createContext<string | undefined>(undefined);

/**
 * Returns the form id provided by the nearest enclosing dialog, or
 * `undefined` if rendered outside one.
 */
export function useFormId(): string | undefined {
  return useContext(FormIdContext);
}
