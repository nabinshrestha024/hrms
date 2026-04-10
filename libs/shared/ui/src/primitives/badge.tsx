import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@erp/utils';

const badgeVariants = cva(
  'cursor-pointer inline-flex items-center rounded-full  py-[2px] px-3 text-[12px] font-normal leading-4 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-badge-text-6 bg-muted',
        warning: 'text-badge-text-4 bg-chart-4',
        primary: 'text-badge-text-5 bg-chart-5',
        secondary: 'text-badge-text-2 bg-chart-2',
        destructive: 'text-badge-text-3 bg-chart-3',
        outline:
          'border border-border text-secondary [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 [a&]:hover:underline',
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
