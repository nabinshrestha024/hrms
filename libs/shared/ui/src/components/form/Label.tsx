import type { ReactNode } from 'react';
import { Label as Root } from '../../primitives/label';

interface LabelProps {
  labelClassName?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const HRLabel = ({ labelClassName, children, onClick }: LabelProps) => {
  return (
    <>
      <Root
        className={`text-[14px] text-foreground font-medium leading-5 ${labelClassName}`}
        onClick={onClick}
      >
        {children}
      </Root>
    </>
  );
};
