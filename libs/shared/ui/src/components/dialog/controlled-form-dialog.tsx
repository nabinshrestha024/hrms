import { cva } from 'class-variance-authority';
import { cn } from '@erp/utils';
import { useCallback, useId, type ReactNode } from 'react';
import { Button } from '../../primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../primitives/dialog';
import { HRCard } from '../card/card';
import { DialogCloseContext } from './dialog-close-context';
import { FormIdContext } from './form-id-context';

type ModalSize = 'sm' | 'md' | 'lg' | 'img';

const dialogContentStyles = cva(
  'p-0 gap-0 rounded bg-background flex flex-col max-h-[90vh] ',
  {
    variants: {
      size: {
        sm: 'sm:max-w-[327px]',
        md: 'sm:max-w-[416px]',
        lg: 'sm:max-w-[556px]',
        img: 'w-[310px] h-[420px]',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const formContainerStyles = cva('flex p-4 border rounded-lg border-border', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-4',
      lg: 'p-4',
      img: 'p-0',
    },
  },
  defaultVariants: { size: 'md' },
});

const dialogHeaderStyles = cva('relative', {
  variants: {
    size: {
      sm: 'px-4 py-[14px]',
      md: 'px-5 py-3',
      lg: 'px-6 py-4',
      img: 'p-0',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface ControlledFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  size?: ModalSize;
  /**
   * Optional override for the inner form id. Most callers should omit this —
   * the dialog generates an id via `useId()` and provides it to descendants
   * via `FormIdContext`. The `<Form>` wrapper picks it up automatically.
   */
  formId?: string;
  /** Defaults to "Save". Pass `null` to hide the submit button. */
  okText?: ReactNode | null;
  /** Defaults to "Cancel". Pass `null` to hide the cancel button. */
  cancelText?: ReactNode | null;
  onCancel?: () => void;
  /** Loading state for the submit button. */
  isSubmitting?: boolean;
  dialogClassName?: string;
  componentClassName?: string;
  children: ReactNode;
}

/**
 * Controlled dialog for forms. Use when the parent must own the open state
 * (e.g. opening from a row action with row data). For the common
 * "button → dialog" case, use `<FormDialog>` (with `trigger`) instead.
 *
 * Forms inside this dialog can grab `close` via `useDialogClose()` and the
 * form id is auto-wired via `FormIdContext` — no `onSuccess` prop, no
 * `formId` magic string:
 *
 * ```tsx
 * function MyForm() {
 *   const close = useDialogClose();
 *   const form = useForm({ ... });
 *   const handleSubmit = (data) => {
 *     mutation.mutate(data, { onSuccess: close });
 *   };
 *   return (
 *     <Form form={form} onSubmit={handleSubmit}>  // picks up id from context
 *       ...
 *     </Form>
 *   );
 * }
 *
 * <ControlledFormDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Edit Branch"
 * >
 *   <MyForm />
 * </ControlledFormDialog>
 * ```
 */
export function ControlledFormDialog({
  open,
  onOpenChange,
  title,
  size = 'md',
  formId,
  okText,
  cancelText = 'Cancel',
  onCancel,
  isSubmitting,
  dialogClassName,
  componentClassName,
  children,
}: ControlledFormDialogProps) {
  // Auto-generate a form id so callers don't have to type magic strings.
  // The `<Form>` wrapper picks this up via FormIdContext and applies it to
  // the inner <form> tag, so the dialog's submit button (which uses
  // `form="<id>"`) is automatically wired to the form.
  const generatedFormId = useId();
  const resolvedFormId = formId ?? generatedFormId;

  // Stable close function exposed to descendants via DialogCloseContext —
  // forms can call `useDialogClose()` instead of accepting an `onSuccess` prop.
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          dialogContentStyles({ size }),
          'p-4 bg-white',
          dialogClassName
        )}
      >
        <DialogHeader className={cn(dialogHeaderStyles({ size }), 'px-0 py-0')}>
          <div className="flex justify-between items-center">
            {title && (
              <DialogTitle className="text-[16px] font-semibold leading-6">
                {title}
              </DialogTitle>
            )}
          </div>
          <DialogClose className="absolute right-0 top-0" aria-label="Close" />
        </DialogHeader>
        <HRCard
          cardClassName={cn(
            formContainerStyles({ size }),
            'mt-4 bg-white',
            componentClassName
          )}
          cardContentClassName="flex flex-col gap-4 p-0"
        >
          <DialogCloseContext.Provider value={close}>
            <FormIdContext.Provider value={resolvedFormId}>
              {children}
            </FormIdContext.Provider>
          </DialogCloseContext.Provider>
          {(okText || cancelText) && (
            <div className="flex justify-end gap-4">
              {cancelText && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-[14px] font-medium leading-5 text-muted-foreground cursor-pointer"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  {cancelText}
                </Button>
              )}
              {okText && (
                <Button
                  type="submit"
                  variant="secondary"
                  form={resolvedFormId}
                  disabled={isSubmitting}
                  className="text-[14px] font-medium leading-5 text-white cursor-pointer"
                >
                  {okText}
                </Button>
              )}
            </div>
          )}
        </HRCard>
      </DialogContent>
    </Dialog>
  );
}
