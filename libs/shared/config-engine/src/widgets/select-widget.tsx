import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRSelect } from '@erp/ui';

export function SelectWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  const selectData = (field.options ?? []).map((option, index) => ({
    id: index,
    value: option,
    content: option.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => (
        <HRSelect
          Label={field.label}
          isRequired={field.isRequired}
          value={typeof formField.value === 'string' ? formField.value : ''}
          onValueChange={formField.onChange}
          selectData={selectData}
          placeholder={`Select ${field.label?.toLowerCase() ?? ''}`}
          error={errorMessage}
          disabled={disabled}
        />
      )}
    />
  );
}
