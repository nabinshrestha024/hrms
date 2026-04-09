import { useId, type ReactNode } from 'react';
import { HRLabel } from './label';

interface FormFieldProps {
  Label: string;
  subLabel?: string;
  error?: string;
  required?: boolean;
  labelClassName?: string;
  htmlFor?: string;
  children: ReactNode;
}

/**
 * Consistent form field wrapper with label, error, and required indicator.
 * Works with any input — just pass it as children.
 *
 * Usage:
 *   <FormField Label="Email" htmlFor="email" error={errors.email?.message} required>
 *     <Input id="email" {...register('email')} />
 *   </FormField>
 */
export function FormField({
  Label,
  error,
  required,
  labelClassName,
  htmlFor,
  subLabel,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = htmlFor || generatedId;

  return (
    <div className="flex flex-col gap-1">
      {Label && (
        <div className="flex gap-1">
          <HRLabel labelClassName={labelClassName} htmlFor={fieldId}>
            {Label}
          </HRLabel>
          {required && <span className="text-destructive">*</span>}
        </div>
      )}

      {subLabel && (
        <div className="text-[14px] text-secondary-foreground font-normal leading-5">
          {subLabel}
        </div>
      )}
      {children}
      {error && <div className="text-[12px] text-destructive">{error}</div>}
    </div>
  );
}
