import { cn } from '@erp/utils';
import * as React from 'react';
import { FormField } from '../form-field';
import { Checkbox } from '../../../primitives/checkbox';

type CheckboxOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type CheckboxGroupProps = {
  options: CheckboxOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
  optionClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  error?: string;
  Label?: string;
  subLabel?: string;
  isRequired?: boolean;
};

function CheckboxGroup({
  options,
  value = [],
  onValueChange,
  className,
  optionClassName,
  labelClassName,
  checkboxClassName,
  error,
  Label,
  subLabel,
  isRequired,
}: CheckboxGroupProps) {
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
                `transition-all select ${
                  isChecked
                    ? 'border border-primary bg-[#EEF2FF]'
                    : 'border border-border bg-white'
                } ${optionClassName}`
              )}
            >
              <span className="text-[14px] font-normal leading-5 text-foreground">
                {opt.label}
              </span>
              <Checkbox
                id={`${generatedId}-${opt.value}`}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={() => toggleValue(opt.value)}
                className={`border border-primary rounded-none ${checkboxClassName}`}
              />
            </label>
          );
        })}
      </div>
    </FormField>
  );
}

export { CheckboxGroup };
export type { CheckboxOption, CheckboxGroupProps };
