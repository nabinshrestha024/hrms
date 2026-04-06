import { forwardRef } from 'react';
import type React from 'react';
import { Textarea as Root } from '../../primitives/textarea';
import { FormField } from './FormField';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textAreaClassName?: string;
  Label?: string;
  labelClassName?: string;
  subLabel?: string;
  isRequired?: boolean;
  error?: string;
}

export const HRTextarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      placeholder,
      error,
      labelClassName,
      Label,
      isRequired,
      subLabel,
      textAreaClassName,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        Label={Label || ''}
        required={isRequired}
        labelClassName={labelClassName}
        error={error}
      >
        <Root
          ref={ref}
          placeholder={placeholder}
          className={`w-full box-border px-3 py-2.5 rounded-[6px] border  border-[#E4E4E7] ${
            textAreaClassName || ''
          }`}
          {...props}
        />

        {subLabel && (
          <div className="text-[12px] text-secondary-foreground font-normal leading-5">
            {subLabel}
          </div>
        )}
      </FormField>
    );
  }
);
