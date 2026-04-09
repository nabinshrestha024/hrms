import { forwardRef, type InputHTMLAttributes } from 'react';
import { Input as Root } from '../../primitives/input';
import { FormField } from './form-field';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Label?: string;
  subLabel?: string;
  isRequired?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
}
export const HRInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      inputClassName,
      labelClassName,
      error,
      Label,
      isRequired,
      subLabel,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        Label={Label || ''}
        subLabel={subLabel}
        required={isRequired}
        labelClassName={labelClassName}
        error={error}
      >
        <Root
          type={type}
          placeholder={placeholder}
          className={`px-3 py-2.5 rounded-[6px] w-full border border-border ${inputClassName}`}
          ref={ref}
          {...props}
        />
      </FormField>
    );
  }
);
