import type { ReactNode } from 'react';
import {
  Alert as Root,
  AlertTitle,
  AlertDescription,
} from '../../primitives/alert';

type CustomAlertProps = {
  icon?: ReactNode;
  title?: string;
  description: ReactNode;
  descriptionClassName?: string;
  titleClassName?: string;
  className?: string;
};

export function CustomAlert({
  icon,
  title,
  description,
  descriptionClassName,
  titleClassName,
  className,
}: CustomAlertProps) {
  return (
    <Root
      className={`flex gap-2 items-center px-3 py-2.5 bg-alert-background border border-border rounded-[6px] ${className}`}
    >
      {icon && <div className="p-1">{icon}</div>}

      <div className="flex flex-col gap-1">
        {title && (
          <AlertTitle className={`${titleClassName}`}>{title}</AlertTitle>
        )}
        <AlertDescription
          className={`text-[12px] font-normal text-secondary-foreground leading-4 ${descriptionClassName}`}
        >
          {description}
        </AlertDescription>
      </div>
    </Root>
  );
}
