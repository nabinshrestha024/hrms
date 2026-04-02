import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@erp/ui';

export function SelectWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  return (
    <div>
      {field.label && (
        <label className="mb-1 block text-sm font-medium">
          {field.label}
          {field.validation?.required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </label>
      )}
      <Controller
        name={field.name}
        control={form.control}
        render={({ field: formField }) => (
          <Select
            value={formField.value ?? ''}
            onValueChange={formField.onChange}
            disabled={disabled}
          >
            <SelectTrigger className={error ? 'border-destructive' : ''}>
              <SelectValue
                placeholder={`Select ${field.label?.toLowerCase() ?? ''}...`}
              />
            </SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((option) => (
                <SelectItem key={option} value={option}>
                  {option
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}
