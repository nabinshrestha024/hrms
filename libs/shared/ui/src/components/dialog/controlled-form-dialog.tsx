import { cva } from 'class-variance-authority';
import { cn } from '@erp/utils';
import type { ReactNode } from 'react';
import { Button } from '../../primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../primitives/dialog';
import { HRCard } from '../card/card';

type ModalSize = 'sm' | 'md' | 'lg' | 'img';

const dialogContentStyles = cva(
  'p-0 gap-0 rounded bg-background flex flex-col max-h-[90vh] border-none',
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
  /** Form id of the inner <form> — wires the submit button to it. */
  formId?: string;
  okText?: ReactNode;
  cancelText?: ReactNode;
  onCancel?: () => void;
  /** Loading state for the submit button. */
  isSubmitting?: boolean;
  dialogClassName?: string;
  componentClassName?: string;
  children: ReactNode;
}

/**
 * Controlled dialog for forms. Unlike the legacy `<FormDialog />` which reads
 * from a global Zustand store (only one dialog at a time, side-effect-driven
 * close), this component is fully controlled via props — supports nested
 * dialogs, is testable, and doesn't couple Form internals to a global.
 *
 * Usage:
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <ControlledFormDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Add Branch"
 *   formId="branch-form"
 *   okText="Add"
 *   cancelText="Cancel"
 *   isSubmitting={mutation.isPending}
 * >
 *   <BranchForm onSuccess={() => setOpen(false)} />
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
  cancelText,
  onCancel,
  isSubmitting,
  dialogClassName,
  componentClassName,
  children,
}: ControlledFormDialogProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
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
          {children}
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
                  form={formId}
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
