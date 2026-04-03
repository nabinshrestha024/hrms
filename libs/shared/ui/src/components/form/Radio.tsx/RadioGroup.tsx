import { cn } from '@erp/utils';
import * as React from 'react';
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupItem as BaseRadioGroupItem,
} from '../../../primitives/radio-group';

type RadioOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type OptionRadioGroupProps = Omit<
  React.ComponentProps<typeof BaseRadioGroup>,
  'children'
> & {
  options: RadioOption[];
  optionClassName?: string;
  itemClassName?: string;
  labelClassName?: string;
  error?: string;
};

function RadioGroup(props: React.ComponentProps<typeof BaseRadioGroup>) {
  return <BaseRadioGroup {...props} />;
}

function RadioGroupItem(
  props: React.ComponentProps<typeof BaseRadioGroupItem>
) {
  return <BaseRadioGroupItem {...props} />;
}

function OptionRadioGroup({
  options,
  className,
  optionClassName,
  itemClassName,
  labelClassName,
  value,
  error,
  onValueChange,
  ...props
}: OptionRadioGroupProps) {
  const generatedId = React.useId();

  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={className}
      {...props}
    >
      {options.map((opt) => {
        const isOptionDisabled = Boolean(opt.disabled);

        return (
          <label
            key={opt.value}
            htmlFor={`${generatedId}-${opt.value}`}
            className={cn(
              'flex items-center gap-1.25 select-none',
              isOptionDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
              optionClassName
            )}
          >
            <RadioGroupItem
              id={`${generatedId}-${opt.value}`}
              value={opt.value}
              className={cn(
                'bg-white border-border-foreground data-[state=checked]:bg-white data-[state=checked]:text-primary',
                isOptionDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
                itemClassName
              )}
            />
            <span className={cn('text-[12px] text-foreground', labelClassName)}>
              {opt.label}
            </span>
          </label>
        );
      })}
      {error && <div className="text-[12px] text-destructive">{error}</div>}
    </RadioGroup>
  );
}

export { RadioGroup, RadioGroupItem, OptionRadioGroup };
export type { RadioOption, OptionRadioGroupProps };
