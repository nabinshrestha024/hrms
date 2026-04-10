import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRFileUpload } from '@erp/ui';
export function FileWidget({ field, form, disabled }: WidgetProps) {
  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => (
        <HRFileUpload
          Label={field.Label}
          label={field.label}
          icon={field.icon}
          subLabel={field.subLabel ?? ''}
          onChange={(file) => formField.onChange(file)}
          drag
        />
      )}
    />
  );
}
