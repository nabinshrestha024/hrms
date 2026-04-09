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

interface SelectDataType {
  id: number;
  content: ReactNode;
  value: string;
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
      Label={Label || ''}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={`w-full px-3 py-2.5 rounded-[6px] border border-border ${triggerClassName}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background text-foreground">
          <SelectGroup className="bg-background text-foreground">
            {selectData.map((val) => (
              <SelectItem
                key={val.id}
                value={val.value}
                className={`${itemClassName} bg-background text-foreground`}
              >
                {val.content}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Root>
    </FormField>
  );
};
