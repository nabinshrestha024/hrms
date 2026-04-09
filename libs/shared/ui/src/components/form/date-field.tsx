import * as React from 'react';

import { CalendarDays } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../primitives/popover';
import { Calendar } from '../../primitives/calendar';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../../primitives/input-group';
import { FormField } from './form-field';

interface HRDateFieldProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  Label?: string;
  isRequired?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}

function formatDate(date: Date | undefined) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export const HRDateField = ({
  date,
  onDateChange,
  Label,
  labelClassName,
  isRequired,
  error,
  disabled,
  placeholder,
  className,
}: HRDateFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [inputValue, setInputValue] = React.useState(formatDate(date));

  React.useEffect(() => {
    setSelectedDate(date);
    setMonth(date);
    setInputValue(formatDate(date));
  }, [date]);

  const handleSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    setInputValue(formatDate(newDate));
    onDateChange?.(newDate);
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
          value={inputValue}
          placeholder={placeholder || 'Enter date'}
          disabled={disabled}
          onChange={(e) => {
            setInputValue(e.target.value);
            const parsedDate = new Date(e.target.value);
            if (!isNaN(parsedDate.getTime())) {
              setSelectedDate(parsedDate);
              setMonth(parsedDate);
              onDateChange?.(parsedDate);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Enter date"
                disabled={disabled}
              >
                <CalendarDays className="text-secondary-foreground" />
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleSelect}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </FormField>
  );
};
