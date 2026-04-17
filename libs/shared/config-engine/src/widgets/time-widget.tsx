import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRTimeField } from '@erp/ui';

export function TimeWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => (
        <HRTimeField
          time={formField.value}
          onTimeChange={formField.onChange}
          disabled={disabled}
          Label={field.label}
          isRequired={field.isRequired}
          error={errorMessage}
          placeholder={
            field.label ? `Select ${field.label.toLowerCase()}` : 'Select time'
          }
        />
      )}
    />
  );
}
