import { cn } from '@erp/utils';
import * as React from 'react';
import {
  RadioGroup as BaseRadioGroup,
  RadioGroupItem as BaseRadioGroupItem,
} from '../../../primitives/radio-group';
import { FormField } from '../form-field';
import type { ComponentProps } from 'react';
import { Badge } from '../../../primitives/badge';

type BadgeVariant = ComponentProps<typeof Badge>['variant'];

type RadioOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: string;
  badgeName?: string;
  badgeVariant?: BadgeVariant;
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
  Label?: string;
  subLabel?: string;
  isRequired?: boolean;
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
  Label,
  subLabel,
  isRequired,
  ...props
}: OptionRadioGroupProps) {
  const generatedId = React.useId();

  return (
    <FormField
      label={Label || ''}
      subLabel={subLabel}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
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
              <div className="flex flex-col gap-1 items-start">
                <span
                  className={cn(
                    'text-[14px] text-foreground font-normal leading-5',
                    labelClassName
                  )}
                >
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-[14px] text-foreground font-normal leading-5">
                    {opt.description}
                  </span>
                )}
                {opt.badgeName && (
                  <Badge variant={opt.badgeVariant}>{opt.badgeName}</Badge>
                )}
              </div>
            </label>
          );
        })}
      </RadioGroup>
    </FormField>
  );
}

export { RadioGroup, RadioGroupItem, OptionRadioGroup };
export type { RadioOption, OptionRadioGroupProps };
