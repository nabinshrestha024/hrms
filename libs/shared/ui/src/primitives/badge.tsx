import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@erp/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'rounded-full py-[2px] px-3 text-gray-600 cursor-pointer bg-chart-6 text-[12px] font-semibold leading-4 text-center ',
        warning:
          'rounded-full py-[2px] px-3 text-yellow-600 bg-chart-4 cursor-pointer text-[12px] font-semibold leading-4 text-center',
        primary:
          'rounded-full py-[2px] px-3 text-blue-600 bg-chart-5 cursor-pointer text-[12px] font-semibold leading-4 text-center',
        secondary:
          'rounded-full py-[2px] px-3 text-green-600 bg-chart-2 cursor-pointer text-[12px] font-semibold leading-4 text-center',
        destructive:
          'rounded-full py-[2px] px-3 text-red-600 bg-chart-3 cursor-pointer text-[12px] font-semibold leading-4 text-center',
        outline:
          'rounded-full py-[2px] px-3  border-border  [a&]:hover:text-accent-foreground',
        ghost:
          'rounded-full py-[2px] px-3  [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'rounded-full py-[2px] px-3  text-primary underline-offset-4 [a&]:hover:underline',
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
