import { cn } from '@erp/utils';
import * as React from 'react';
import { FormField } from '../form-field';
import { Switch } from '../../../primitives/switch';
import { Button } from '../../../primitives/button';

export type WorkingDayValue = {
  day: string;
  type: 'full' | 'half';
};

type SwitchCheckboxOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type OptionSwitchCheckboxGroupProps = {
  options: SwitchCheckboxOption[];
  value?: WorkingDayValue[];
  onValueChange?: (value: WorkingDayValue[]) => void;
  className?: string;
  optionClassName?: string;
  labelClassName?: string;
  error?: string;
  Label?: string;
  subLabel?: string;
  isRequired?: boolean;
};

function OptionSwitchCheckboxGroup({
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
}: OptionSwitchCheckboxGroupProps) {
  const generatedId = React.useId();

  const toggleDay = (day: string) => {
    if (!onValueChange) return;

    const exists = value.find((d) => d.day === day);

    if (exists) {
      onValueChange(value.filter((d) => d.day !== day));
    } else {
      onValueChange([...value, { day, type: 'full' }]);
    }
  };

  const toggleType = (day: string) => {
    if (!onValueChange) return;

    onValueChange(
      value.map((d) =>
        d.day === day ? { ...d, type: d.type === 'full' ? 'half' : 'full' } : d
      )
    );
  };

  return (
    <FormField
      label={Label || ''}
      subLabel={subLabel}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <div className={cn('flex flex-col gap-4', className)}>
        {options.map((opt) => {
          const selected = value.find((d) => d.day === opt.value);
          const isChecked = !!selected;
          const isFull = selected?.type === 'full';

          return (
            <label
              key={opt.value}
              htmlFor={`${generatedId}-${opt.value}`}
              className={cn(
                'flex justify-between items-center text-sm',
                optionClassName
              )}
            >
              <div className="flex gap-3 items-center">
                <Switch
                  id={`${generatedId}-${opt.value}`}
                  checked={isChecked}
                  disabled={opt.disabled}
                  onCheckedChange={() => toggleDay(opt.value)}
                />

                <span className={cn(labelClassName)}>{opt.label}</span>

                {isChecked && (
                  <div className="px-2 py-0.5 rounded-full bg-muted text-xs">
                    {isFull ? 'Full Day' : 'Half Day'}
                  </div>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={!isChecked}
                onClick={() => toggleType(opt.value)}
              >
                {isFull ? 'Set half day' : 'Set full day'}
              </Button>
            </label>
          );
        })}
      </div>
    </FormField>
  );
}

export { OptionSwitchCheckboxGroup };
