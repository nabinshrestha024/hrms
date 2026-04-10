import { useState, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../../primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../primitives/dialog';

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
  title = 'Are you sure?',
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-start gap-3">
            {destructive && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
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
            variant={destructive ? 'destructive' : 'secondary'}
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? 'Working…' : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
