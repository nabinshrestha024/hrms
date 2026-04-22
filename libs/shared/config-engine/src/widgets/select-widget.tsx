import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';
import { HRSelect } from '@erp/ui';

type OptionType =
  | string
  | {
      label: string;
      value: string;
      color?: string;
    };

export function SelectWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  const selectData = ((field.options as OptionType[]) ?? []).map(
    (option, index) => {
      if (typeof option === 'string') {
        return {
          id: index,
          value: option,
          content: option
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          color: undefined,
        };
      }

      return {
        id: index,
        value: option.value,
        content: option.label,
        color: option.color,
      };
    }
  );

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => {
        return (
          <HRSelect
            Label={field.label}
            isRequired={field.isRequired}
            value={formField.value as string | undefined}
            onValueChange={formField.onChange}
            selectData={selectData}
            placeholder={`Select ${field.label?.toLowerCase() ?? ''}`}
            error={errorMessage}
            disabled={disabled}
          />
        );
      }}
    />
  );
}
