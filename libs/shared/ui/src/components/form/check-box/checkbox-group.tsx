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
              className={cn(' transition-all select', optionClassName)}
            >
              <Checkbox
                id={`${generatedId}-${opt.value}`}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={() => toggleValue(opt.value)}
                className={`border border-primary`}
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
