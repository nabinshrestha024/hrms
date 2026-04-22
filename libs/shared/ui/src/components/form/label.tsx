import type { ReactNode } from 'react';
import { Label as Root } from '../../primitives/label';

interface LabelProps {
  labelClassName?: string;
  children: ReactNode;
  htmlFor?: string;
  onClick?: () => void;
}

export const HRLabel = ({
  labelClassName,
  children,
  htmlFor,
  onClick,
}: LabelProps) => {
  return (
    <Root
      htmlFor={htmlFor}
      className={`text-[14px] text-foreground font-normal leading-5 ${
        labelClassName || ''
      }`}
      onClick={onClick}
    >
      {children}
    </Root>
  );
};
