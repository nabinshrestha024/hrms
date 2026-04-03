import type { ReactNode } from 'react';
import { FormField } from 'src/components/form/FormField';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from 'src/primitives/combobox';

interface ComboboxDataType {
  id: number;
  content: ReactNode;
  value: string;
}

interface HRComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  itemClassName?: string;
  selectData: ComboboxDataType[];
  isRequired?: boolean;
  error?: string;
  Label?: string;
  disabled?: boolean;
  emptyMessage?: string;
  labelClassName?: string;
}

export const HRCombobox = ({
  value,
  onValueChange,
  placeholder,
  labelClassName,
  inputClassName,
  itemClassName,
  selectData,
  isRequired,
  error,
  Label,
  disabled,
  emptyMessage = 'No items found.',
}: HRComboboxProps) => {
  return (
    <FormField
      Label={Label || ''}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <Combobox
        items={selectData}
        value={value}
        onValueChange={(val) => {
          if (val !== null) {
            onValueChange?.(val);
          }
        }}
        disabled={disabled}
      >
        <ComboboxInput placeholder={placeholder} className={inputClassName} />

        <ComboboxContent className="bg-background text-foreground">
          <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem
                key={item.id}
                value={item.value}
                className={`${itemClassName} bg-background text-foreground`}
              >
                {item.content}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </FormField>
  );
};
