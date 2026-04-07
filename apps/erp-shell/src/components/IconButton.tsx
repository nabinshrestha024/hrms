import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@erp/utils';

const iconVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'p-1 rounded-sm  w-6 h-6 text-gray-600 cursor-pointer bg-muted  text-center ',
        request:
          'p-1 rounded-sm  w-6 h-6 bg-chart-1 text-indigo-600 text-center cursor-pointer',
        warning:
          'p-1 rounded-sm  w-6 h-6 text-yellow-600 bg-chart-4 cursor-pointer  text-center',
        primary:
          'p-1 rounded-sm  w-6 h-6 text-blue-600 bg-chart-5 cursor-pointer  text-center',
        secondary:
          'p-1 rounded-sm  w-6 h-6 text-green-600 bg-chart-2 cursor-pointer  text-center',
        destructive:
          'p-1 rounded-sm  w-6 h-6 text-red-600 bg-chart-3 cursor-pointer  text-center',
        outline:
          'p-1 rounded-sm  w-6 h-6  border-border  [a&]:hover:text-accent-foreground',
        ghost:
          'p-1 rounded-sm  w-6 h-6  [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'p-1 rounded-sm  w-6 h-6  text-primary underline-offset-4 [a&]:hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function IconButton({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof iconVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type="button"
      data-slot="icon-button"
      data-variant={variant}
      className={cn(iconVariants({ variant }), className)}
      {...props}
    />
  );
}

export { IconButton, iconVariants };
