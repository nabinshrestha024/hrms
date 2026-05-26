import { LucideIcon } from 'lucide-react';
import React, { useRef, useState, type ReactNode } from 'react';
import { HRInput } from './input';

interface HRFileUploadProps {
  className: string;
  buttonClassName: string;
  icon?: LucideIcon;
  label?: string;
  subLable: string;
  browseText?: ReactNode;
  drag?: boolean;
  iconClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  previewClassName?: string;
  iconClass?: string;
  isRequired?: boolean;
  onChange?: (file: File) => void;
}

export const FileUpload = ({
  icon: Icon,
  className,
  iconClassName,
  iconClass,
  cardClassName,
  titleClassName,
  buttonClassName,
  previewClassName,
  isRequired,
  label,
  browseText,
  subLable,
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
      className={className}
      onDragOver={(e) => drag && e.preventDefault()}
      onDrop={drag ? handleDrop : undefined}
    >
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className={`w-104.75 h-38.25 object-cover ${previewClassName}`}
        />
      ) : (
        <>
          <div className={cardClassName}>
            {Icon && (
              <div className={`${iconClassName}`}>
                <Icon className={iconClass} />
              </div>
            )}
            <div className={titleClassName}>
              {label && (
                <div className="text-[12px] leading-5 font-normal flex gap-1">
                  {label}
                  {isRequired && <span className="text-destructive">*</span>}
                </div>
              )}

              <div className="text-secondary-foreground text-[14px] font-normal">
                {subLable}
              </div>
            </div>
          </div>

          <button
            type="button"
            className={buttonClassName}
            onClick={handleBrowse}
          >
            {browseText ?? 'Browse'}
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
