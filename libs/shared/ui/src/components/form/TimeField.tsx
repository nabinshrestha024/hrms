import * as React from 'react';
import { InputGroup, InputGroupInput } from 'src/primitives/input-group';
import { FormField } from 'src/components/form/FormField';

interface HRTimePickerProps {
  time?: string;
  onTimeChange?: (time: string) => void;
  Label?: string;
  isRequired?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

function formatTime(time?: string) {
  if (!time) return '';
  return time;
}

export const HRTimePicker = ({
  time,
  labelClassName,
  onTimeChange,
  Label,
  isRequired,
  error,
  disabled,
  placeholder,
  className,
}: HRTimePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState<string | undefined>(
    time
  );
  const [inputValue, setInputValue] = React.useState(formatTime(time));

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    setInputValue(value);
    onTimeChange?.(value);
    setOpen(false);
  };

  return (
    <FormField
      Label={Label || ''}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <InputGroup className={className}>
        <InputGroupInput
          type="time"
          step="1"
          value={inputValue}
          placeholder={placeholder || 'Select time'}
          disabled={disabled}
          onChange={(e) => handleTimeChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
      </InputGroup>
    </FormField>
  );
};
