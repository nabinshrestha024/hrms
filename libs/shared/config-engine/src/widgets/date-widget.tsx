import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRDateField } from '@erp/ui';

export function DateWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => (
        <HRDateField
          date={formField.value as Date | undefined}
          onDateChange={formField.onChange}
          disabled={disabled}
          Label={field.label}
          isRequired={field.isRequired}
          error={errorMessage}
          placeholder={
            field.label ? `Select ${field.label.toLowerCase()}` : undefined
          }
        />
      )}
    />
  );
}
