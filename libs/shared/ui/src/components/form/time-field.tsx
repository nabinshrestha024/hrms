import * as React from 'react';
import { InputGroup, InputGroupInput } from '../../primitives/input-group';
import { FormField } from './form-field';

interface HRTimeFieldProps {
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

export const HRTimeField = ({
  time,
  labelClassName,
  onTimeChange,
  Label,
  isRequired,
  error,
  disabled,
  placeholder,
  className,
}: HRTimeFieldProps) => {
  const [inputValue, setInputValue] = React.useState(time || '');

  React.useEffect(() => {
    setInputValue(time || '');
  }, [time]);

  const handleTimeChange = (value: string) => {
    setInputValue(value);
    onTimeChange?.(value);
  };

  return (
    <FormField
      label={Label || ''}
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
        />
      </InputGroup>
    </FormField>
  );
};
