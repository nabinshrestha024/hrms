import { cn } from '@erp/utils';
import * as React from 'react';
import { FormField } from '../form-field';
import { Checkbox } from '../../../primitives/checkbox';

type CheckboxOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type OptionCheckboxGroupProps = {
  options: CheckboxOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
  optionClassName?: string;
  labelClassName?: string;
  error?: string;
  Label?: string;
  subLabel?: string;
  isRequired?: boolean;
};

function OptionCheckboxGroup({
  options,
  value = [],
  onValueChange,
  className,
  optionClassName,
  labelClassName,
  error,
  Label,
  subLabel,
  isRequired,
}: OptionCheckboxGroupProps) {
  const generatedId = React.useId();

  const toggleValue = (val: string) => {
    if (!onValueChange) return;

    if (value.includes(val)) {
      onValueChange(value.filter((v) => v !== val));
    } else {
      onValueChange([...value, val]);
    }
  };

  return (
    <FormField
      label={Label || ''}
      subLabel={subLabel}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <div className={cn('flex flex-wrap gap-2', className)}>
        {options.map((opt) => {
          const isChecked = value.includes(opt.value);
          const isDisabled = opt.disabled;

          return (
            <label
              key={opt.value}
              htmlFor={`${generatedId}-${opt.value}`}
              className={cn(
                'px-2 py-0.5 rounded-full border text-sm transition-all',
                'flex items-center justify-center select',
                isChecked
                  ? 'bg-primary text-white border-primary'
                  : 'bg-muted text-foreground border-border',
                isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer ',
                optionClassName
              )}
            >
              <Checkbox
                id={`${generatedId}-${opt.value}`}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={() => toggleValue(opt.value)}
                className="hidden"
              />
              <span className={cn(labelClassName)}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </FormField>
  );
}

export { OptionCheckboxGroup };
export type { CheckboxOption, OptionCheckboxGroupProps };
