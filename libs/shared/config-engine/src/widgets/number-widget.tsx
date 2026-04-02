import type { WidgetProps } from '../types';
import { Input } from '@erp/ui';

export function NumberWidget({ field, form, disabled }: WidgetProps) {
  const { register } = form;
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  return (
    <div>
      {field.label && (
        <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
          {field.label}
          {field.validation?.required && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </label>
      )}
      <Input
        id={field.name}
        type="number"
        {...register(field.name)}
        disabled={disabled}
        aria-invalid={!!error}
        className={error ? 'border-destructive' : ''}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}
