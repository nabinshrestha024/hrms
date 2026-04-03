import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@erp/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border py-[2px] px-3 text-[12px] font-semibold leading-4 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'text-gray-600 bg-chart-6',
        warning: 'text-yellow-600 bg-chart-4',
        primary: 'text-blue-600 bg-chart-5',
        secondary: 'text-green-600 bg-chart-2',
        destructive: 'text-red-600 bg-chart-3',
        outline: 'border-border [a&]:hover:text-accent-foreground',
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
