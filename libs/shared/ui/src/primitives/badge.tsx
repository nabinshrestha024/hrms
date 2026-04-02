import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@erp/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-transparent bg-[#F4F4F5] text-[#3F3F46] dark:bg-[#27272A] dark:text-[#FAFAFA]',
        destructive:
          'border-transparent bg-[#FEE2E2] text-[#EF4444] dark:bg-[#450A0A] dark:text-[#FCA5A5]',
        outline: 'text-foreground',
        success:
          'border-transparent bg-[#DCFCE7] text-[#00A63E] dark:bg-[#052E16] dark:text-[#86EFAC]',
        warning:
          'border-transparent bg-[#FEF3C7] text-[#D97706] dark:bg-[#451A03] dark:text-[#FCD34D]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof badgeVariants>) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
