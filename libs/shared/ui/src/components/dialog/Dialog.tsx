import type { ReactNode } from 'react';
import {
  Dialog as Root,
  DialogContent,
  DialogTrigger,
} from '../../primitives/dialog';

interface DialogProps {
  children: ReactNode;
  className?: string;
  triggerContent: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  overlayClassName?: string;
}

export const HRDialog = ({
  children,
  className,
  triggerContent,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>
      <DialogContent className={className}>{children}</DialogContent>
    </Root>
  );
};
