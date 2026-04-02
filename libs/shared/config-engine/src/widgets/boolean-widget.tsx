import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { Switch } from '@erp/ui';

export function BooleanWidget({ field, form, disabled }: WidgetProps) {
  return (
    <div className="flex items-center gap-3">
      <Controller
        name={field.name}
        control={form.control}
        render={({ field: formField }) => (
          <Switch
            id={field.name}
            checked={formField.value ?? false}
            onCheckedChange={formField.onChange}
            disabled={disabled}
            aria-label={field.label}
          />
        )}
      />
      {field.label && (
        <label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
        </label>
      )}
    </div>
  );
}
