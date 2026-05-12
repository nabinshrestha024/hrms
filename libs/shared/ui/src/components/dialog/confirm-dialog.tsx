import { useState, type ReactNode } from 'react';
import { Button } from '../../primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../primitives/dialog';
import { Asterisk, X } from 'lucide-react';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  /** Show the destructive (red) variant for delete confirmations. */
  destructive?: boolean;
  /**
   * Called when the user clicks confirm. Can be sync or async — the dialog
   * shows a loading state while a returned promise is pending and closes
   * automatically on success. Throw to keep the dialog open.
   */
  onConfirm: () => void | Promise<void>;
}

/**
 * Reusable confirmation dialog. Use for destructive actions (delete, archive)
 * and any other operation where the user benefits from a "are you sure?"
 * checkpoint.
 *
 * Usage:
 * ```tsx
 * const [confirmOpen, setConfirmOpen] = useState(false);
 * const deleteMutation = useDeleteBranch();
 *
 * <ConfirmDialog
 *   open={confirmOpen}
 *   onOpenChange={setConfirmOpen}
 *   title="Delete branch?"
 *   description="This action cannot be undone."
 *   destructive
 *   onConfirm={() => deleteMutation.mutateAsync(branchId)}
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Confirmation',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  destructive = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsPending(true);
      await onConfirm();
      onOpenChange(false);
    } catch {
      // Caller's mutation already surfaces the error via toast / boundary.
      // Keep the dialog open so the user can retry or cancel.
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h[149px] p-0 gap-0" showCloseButton={false}>
        <DialogHeader>
          <div className="flex justify-between items-center px-6 py-3 border-b border-b-border">
            <DialogTitle className="text-[17px] font-bold text-[#1C1F22]">
              {title}
            </DialogTitle>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                {cancelText}
              </Button>
              <Button
                type="button"
                variant="default"
                className="bg-foreground text-white"
                onClick={handleConfirm}
                disabled={isPending}
              >
                {isPending ? 'Working…' : confirmText}
              </Button>
            </div>
          </div>
          <DialogClose className="absolute -top-3 -right-2 w-6 h-6 rounded-full bg-black flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </DialogClose>
        </DialogHeader>

        {description && (
          <div className="px-6 py-3 bg-[#F25768] mb-5.5 mt-4.5 flex gap-1 items-center">
            <Asterisk className="w-4 h-4 text-white" />
            <span className="text-white text-[13px] font-medium">
              {description}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
