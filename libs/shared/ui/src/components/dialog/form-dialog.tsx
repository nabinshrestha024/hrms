import { cva } from 'class-variance-authority';
import { Button } from '../../primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../primitives/dialog';
import { cn } from '@erp/utils';
import { HRCard } from '../card/Card';
import { useDialogFormStore } from './form-store';

const dialogContentStyles = cva(
  'p-0 gap-0 rounded bg-white flex flex-col max-h-[90vh] border-none',
  {
    variants: {
      size: {
        sm: 'sm:max-w-[327px]',
        md: 'sm:max-w-[416px]',
        lg: 'sm:max-w-[556px] ',
        img: 'w-[310px] h-[420px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const formContainerStyles = cva('flex p-4 border rounded-lg border-[#E4E4E7]', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-4',
      lg: 'p-4',
      img: 'p-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const dialogHeaderStyles = cva(' relative ', {
  variants: {
    size: {
      sm: 'px-4 py-[14px]',
      md: 'px-5 py-3',
      lg: 'px-6 py-4',
      img: 'p-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const FormDialog = () => {
  const {
    modalTitle,
    open,
    onClose,
    size,
    okText,
    cancelText,
    component,
    formId,
    dialogClassName,
    componentClassName,
  } = useDialogFormStore();
  // const formState = useDialogFormStore((state) => state.formState)

  // const submitting = formState?.isSubmitting

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className={cn(
            dialogContentStyles({ size }),
            `p-4 ${dialogClassName}`
          )}
        >
          <DialogHeader
            className={cn(dialogHeaderStyles({ size }), `px-0 py-0`)}
          >
            <div className="flex justify-between items-center ">
              {modalTitle && (
                <DialogTitle className="text-[16px] font-semibold leading-6">
                  {modalTitle}
                </DialogTitle>
              )}
            </div>
            <DialogClose className="absolute -top-10 left-4 "></DialogClose>
          </DialogHeader>
          <HRCard
            cardClassName={cn(
              formContainerStyles({ size }),
              `mt-4 ${componentClassName}`
            )}
            cardContnetClassName="flex flex-col gap-4 p-0"
          >
            {component}
            <div className="flex justify-end gap-4">
              {cancelText && (
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-[14px] font-medium leading-5  text-muted-foreground "
                  >
                    {cancelText}
                  </Button>
                </DialogClose>
              )}
              {okText && (
                <Button
                  type="submit"
                  variant="secondary"
                  form={formId}
                  className=" text-[14px] font-medium leading-5 text-white"
                >
                  {okText}
                </Button>
              )}
            </div>
          </HRCard>
        </DialogContent>
      </Dialog>
    </div>
  );
};
