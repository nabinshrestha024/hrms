import { Controller } from 'react-hook-form';
import type { WidgetProps } from '../types';

type Option = {
  label: string;
  value: string;
  color: string;
};

export function ColorRadioWidget({ field, form, disabled }: WidgetProps) {
  const error = form.formState.errors[field.name];
  const errorMessage = error?.message ? String(error.message) : undefined;

  const rawOptions = field.options ?? [];

  const options: Option[] = rawOptions.map((opt) => {
    if (typeof opt === 'string') {
      return {
        label: opt,
        value: opt,
        color: opt,
      };
    }
    return {
      label: opt.content,
      value: opt.value,
      color: opt.color ?? opt.value,
    };
  });

  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField }) => {
        const value = formField.value as string | undefined;

        return (
          <div className="flex flex-col gap-2">
            {field.label && (
              <label className="text-[14px] font-medium leading-5 text-[#18181B]">
                {field.label}
                {field.isRequired && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
            )}

            <div role="radiogroup" className="flex gap-2 flex-wrap">
              {options.map((option) => {
                const isSelected = value === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={option.label}
                    disabled={disabled}
                    onClick={() => formField.onChange(option.value)}
                    className="flex flex-col items-center cursor-pointer bg-transparent border-none p-0"
                  >
                    <div
                      className={`w-7 h-7 rounded-full ${
                        isSelected ? 'border border-black' : ''
                      }`}
                      style={{ backgroundColor: option.color }}
                    />

                    {isSelected && (
                      <span className="text-[12px] leading-4 font-normal mt-1 border text-secondary rounded-[2px] px-0.5 py-1">
                        {option.color}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {errorMessage && (
              <span className="text-sm text-red-500">{errorMessage}</span>
            )}
          </div>
        );
      }}
    />
  );
}
