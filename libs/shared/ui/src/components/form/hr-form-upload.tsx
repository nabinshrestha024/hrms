import { LucideIcon } from 'lucide-react';
import React, { useRef, useState, type ReactNode } from 'react';
import { HRInput } from '../../components/form/input';

interface HRFileUploadProps {
  className?: string;
  buttonClassName?: string;
  icon?: LucideIcon;
  label?: string;
  subLabel: string;
  browseText?: ReactNode;
  drag?: boolean;
  iconClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  iconClass?: string;
  isRequired?: boolean;
  onChange?: (file: File) => void;
}

export const HRFileUpload = ({
  icon: Icon,
  className,
  iconClassName,
  iconClass,
  cardClassName,
  titleClassName,
  buttonClassName,
  isRequired,
  label,
  browseText,
  subLabel,
  drag = false,
  onChange,
  ...props
}: HRFileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    onChange?.(file);
  };

  return (
    <div
      className={`bg-muted border border-dashed rounded-[2px] py-6 text-center cursor-pointer flex flex-col justify-center items-center gap-2 ${className}`}
      onDragOver={(e) => drag && e.preventDefault()}
      onDrop={drag ? handleDrop : undefined}
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="w-104.75 h-38.25 object-cover"
        />
      ) : (
        <>
          <div className={`flex flex-col gap-2 items-center ${cardClassName}`}>
            {Icon && (
              <div
                className={`w-10 h-10 flex justify-center items-center rounded-full bg-chart-1 ${iconClassName}`}
              >
                <Icon className={`w-6 h-6 text-primary ${iconClass}`} />
              </div>
            )}
            <div className={`flex flex-col items-center ${titleClassName}`}>
              {label && (
                <div className="text-[12px] leading-5 font-normal flex gap-1">
                  {label}
                  {isRequired && <span className="text-destructive">*</span>}
                </div>
              )}

              <div className="text-secondary-foreground text-[14px] font-normal">
                {subLabel}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`w-30 px-4 py-2 bg-[#4F39F6] rounded-xl text-[14px] font-medium text-white ${buttonClassName}`}
            onClick={handleBrowse}
          >
            Browse File
          </button>
        </>
      )}

      <HRInput
        ref={inputRef}
        type="file"
        inputClassName="hidden"
        accept="image/*"
        onChange={handleInputChange}
        {...props}
      />
    </div>
  );
};
