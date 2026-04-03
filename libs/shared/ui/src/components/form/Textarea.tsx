import { Textarea as Root } from '../../primitives/textarea';
import React from 'react';
import { FormField } from 'src/components/form/FormField';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textAreaClassName?: string;
  Label?: string;
  labelClassName?: string;
  subLabel?: string;
  isRequired?: boolean;
  error?: string;
}

export const HRTextArea = ({
  placeholder,
  error,
  labelClassName,
  Label,
  isRequired,
  subLabel,
  textAreaClassName,
  ...props
}: TextAreaProps) => {
  return (
    <FormField
      Label={Label || ''}
      required={isRequired}
      labelClassName={labelClassName}
      error={error}
    >
      <Root
        placeholder={placeholder}
        className={`w-full box-border ${textAreaClassName}`}
        {...props}
      />

      {subLabel && (
        <div className="text-[12px] text-secondary-foreground font-normal leading-5">
          {subLabel}
        </div>
      )}
    </FormField>
  );
};
