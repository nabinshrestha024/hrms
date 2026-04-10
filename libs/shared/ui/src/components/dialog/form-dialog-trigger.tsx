import {
  cloneElement,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  ControlledFormDialog,
  type ControlledFormDialogProps,
} from './controlled-form-dialog';

type DialogChildren =
  | ReactNode
  | ((api: { close: () => void; open: () => void }) => ReactNode);

export interface FormDialogProps
  extends Omit<
    ControlledFormDialogProps,
    'open' | 'onOpenChange' | 'children'
  > {
  /**
   * The element that opens the dialog. Its `onClick` is wired automatically —
   * any existing `onClick` you pass still fires first.
   */
  trigger: ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  /**
   * Dialog body. Pass JSX directly, or a render function `(api) => JSX` to
   * access `close` (e.g. for `onSuccess={api.close}`).
   */
  children: DialogChildren;
  /** Optional controlled-from-outside open state. Omit for self-managed state. */
  defaultOpen?: boolean;
  /** Called whenever the dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Ergonomic form dialog with a built-in trigger and self-managed state.
 *
 * Usage (zero useState needed):
 * ```tsx
 * <FormDialog
 *   trigger={<Button>Create branch</Button>}
 *   title="Create branch"
 *   formId="branch-form"
 *   okText="Add"
 *   cancelText="Cancel"
 * >
 *   {({ close }) => <BranchForm onSuccess={close} />}
 * </FormDialog>
 * ```
 *
 * Or with static children if the form doesn't need to close itself:
 * ```tsx
 * <FormDialog trigger={<Button>Edit</Button>} title="Edit" formId="x-form">
 *   <EditForm />
 * </FormDialog>
 * ```
 *
 * For cases where the parent must own the open state (e.g. opening from a row
 * action with row data), use `<ControlledFormDialog>` directly.
 */
export function FormDialog({
  trigger,
  children,
  defaultOpen = false,
  onOpenChange,
  ...dialogProps
}: FormDialogProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  const close = () => handleOpenChange(false);
  const openDialog = () => handleOpenChange(true);

  // Wire the trigger's onClick to open the dialog while preserving any
  // existing onClick handler the caller passed.
  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick?.(e);
          if (!e.defaultPrevented) openDialog();
        },
      })
    : trigger;

  return (
    <>
      {triggerElement}
      <ControlledFormDialog
        {...dialogProps}
        open={open}
        onOpenChange={handleOpenChange}
      >
        {typeof children === 'function'
          ? children({ close, open: openDialog })
          : children}
      </ControlledFormDialog>
    </>
  );
}
