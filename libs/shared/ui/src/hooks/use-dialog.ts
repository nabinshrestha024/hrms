import { useState, useCallback } from 'react';

/**
 * Minimal hook to manage dialog open/close state with optional data payload.
 *
 * Usage:
 *   const addDialog = useDialog();
 *   const editDialog = useDialog<Employee>();
 *
 *   <Button onClick={addDialog.open}>Add</Button>
 *   <Button onClick={() => editDialog.open(employee)}>Edit</Button>
 *
 *   <AddDialog {...addDialog.props} />
 *   <EditDialog {...editDialog.props} data={editDialog.data} />
 */

export interface DialogState<T = void> {
  /** Is the dialog open? */
  isOpen: boolean;
  /** Data passed when opening (e.g., the entity to edit) */
  data: T | null;
  /** Open the dialog, optionally with data */
  open: T extends void ? () => void : (data: T) => void;
  /** Close the dialog and clear data */
  close: () => void;
  /** Props to spread onto any dialog component: { open, onOpenChange } */
  props: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };
}

export function useDialog<T = void>(): DialogState<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((payload?: T) => {
    setData((payload ?? null) as T | null);
    setIsOpen(true);
  }, []) as DialogState<T>['open'];

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const onOpenChange = useCallback((v: boolean) => {
    if (!v) {
      setIsOpen(false);
      setData(null);
    }
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    props: { open: isOpen, onOpenChange },
  };
}
