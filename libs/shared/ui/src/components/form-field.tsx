import type { ReactNode } from 'react';
import { cn } from '@erp/utils';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Consistent form field wrapper with label, error, and required indicator.
 * Works with any input — just pass it as children.
 *
 * Usage:
 *   <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
 *     <Input id="email" {...register('email')} />
 *   </FormField>
 */
export function FormField({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
