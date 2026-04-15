import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRTextarea } from '@erp/ui';

export function TextareaWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => (
        <HRTextarea
          {...formField}
          value={typeof formField.value === 'string' ? formField.value : ''}
          disabled={disabled}
          placeholder={field.placeholder || 'Type here'}
          Label={field.label}
          isRequired={field.isRequired}
          error={errorMessage}
          subLabel={field.subLabel}
          textAreaClassName={field.textAreaClassName}
        />
      )}
    />
  );
}
