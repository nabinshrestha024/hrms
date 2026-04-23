import type { ReactNode } from 'react';
import {
  Select as Root,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../primitives/select';
import { FormField } from './form-field';
import { cn } from '@erp/utils';
import { LucideIcon } from 'lucide-react';

interface SelectDataType {
  id: number;
  content: ReactNode;
  value: string;
  color?: string;
  icon?: LucideIcon;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
  placeholder?: string;
  itemClassName?: string;
  selectData: SelectDataType[];
  isRequired?: boolean;
  error?: string | undefined;
  Label?: string;
  disabled?: boolean;
  labelClassName?: string;
}

export const HRSelect = ({
  value,
  onValueChange,
  triggerClassName,
  placeholder,
  itemClassName,
  labelClassName,
  selectData,
  isRequired,
  error,
  Label,
  disabled,
}: SelectProps) => {
  return (
    <FormField
      label={Label || ''}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={`w-full px-3 py-2.5 rounded-[6px] border border-border cursor-pointer bg-white ${triggerClassName}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-white text-foreground">
          <SelectGroup className="bg-background text-foreground">
            {selectData.map((val) => {
              const Icon = val.icon;

              return (
                <SelectItem
                  key={val.id}
                  value={val.value}
                  className={cn(
                    `bg-white text-foreground cursor-pointer ${itemClassName}`
                  )}
                >
                  {val.color ? (
                    <div className="flex gap-2 items-center">
                      <div
                        className="rounded-full w-4 h-4"
                        style={{ backgroundColor: val.color }}
                      />
                      {val.content}
                    </div>
                  ) : val.icon && Icon ? (
                    <div className="flex gap-2 items-center">
                      <Icon className="w-4 h-4 text-badge-text-8" />
                      {val.content}
                    </div>
                  ) : (
                    <>{val.content}</>
                  )}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Root>
    </FormField>
  );
};
