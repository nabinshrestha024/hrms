import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRInput } from '@erp/ui';

export function TextWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => (
        <HRInput
          {...formField}
          value={formField.value ?? ''}
          type={field.type}
          disabled={disabled}
          isRequired={field.isRequired}
          placeholder={field.placeholder}
          subLabel={field.subLabel}
          Label={field.label}
          error={errorMessage}
        />
      )}
    />
  );
}
