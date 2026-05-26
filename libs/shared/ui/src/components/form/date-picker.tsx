import * as React from 'react';
import { format } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { Button } from '../../primitives/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../primitives/popover';
import { Calendar } from '../../primitives/calendar';
import { CalendarDays, CheckIcon } from 'lucide-react';
import { Field } from '../../primitives/field';

type Preset = {
  label: string;
  from: Date;
  to?: Date;
  isActive?: boolean;
  onClick?: () => void;
};

interface DatePickerProps {
  className?: string;
  placeHolderClassName?: string;
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  defaultMonth?: Date;
  numberOfMonths?: number;
  placeholder?: string;

  presets?: Preset[];
}

export function DatePicker({
  className,
  placeHolderClassName,
  value,
  onChange,
  defaultMonth,
  numberOfMonths = 1,
  placeholder = 'Pick a date',
  presets,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    value
  );

  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  const selectedDate = value ?? internalDate;

  const handleSelect = (date: DateRange | undefined) => {
    setInternalDate(date);
    onChange?.(date);
  };

  const handlePreset = (preset: Preset) => {
    const range: DateRange = {
      from: preset.from,
      to: preset.to ?? preset.from,
    };

    handleSelect(range);
  };

  return (
    <Field className="w-60">
      <Popover>
        <PopoverTrigger asChild className={className}>
          <Button
            variant="outline"
            className="px-2.5 font-normal border border-border bg-[#FFF] rounded-[6px] flex items-center gap-2"
          >
            <CalendarDays className="h-4 w-4 text-secondary-foreground" />

            {selectedDate?.from ? (
              selectedDate.to ? (
                <>
                  {format(selectedDate.from, 'LLL dd, y')} -{' '}
                  {format(selectedDate.to, 'LLL dd, y')}
                </>
              ) : (
                format(selectedDate.from, 'LLL dd, y')
              )
            ) : (
              <span className={placeHolderClassName ?? 'text-muted-foreground'}>
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex">
            <Calendar
              mode="range"
              defaultMonth={defaultMonth ?? selectedDate?.from ?? new Date()}
              selected={selectedDate}
              onSelect={handleSelect}
              numberOfMonths={1}
            />

            {presets?.length ? (
              <div className="border-l p-2 flex flex-col gap-2 min-w-35 items-start">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handlePreset(preset);
                      preset.onClick?.();
                    }}
                    className={`w-full border-none flex justify-between items-center ${
                      preset.isActive
                        ? 'border border-primary bg-primary-foreground '
                        : ''
                    }`}
                  >
                    {preset.label}
                    {preset.isActive && (
                      <CheckIcon className="w-5 h-5 text-primary" />
                    )}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
