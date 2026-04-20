import type { ReactNode } from 'react';
import { Card as Root, CardContent } from '../../primitives/card';

interface CardProps {
  children: ReactNode;
  cardContentClassName?: string;
  cardClassName?: string;
  onClick?: () => void;
}

export const HRCard = ({
  children,
  cardContentClassName,
  cardClassName,
  onClick,
}: CardProps) => {
  return (
    <>
      <Root className={`${cardClassName}`} onClick={onClick}>
        <CardContent className={cardContentClassName}>{children}</CardContent>
      </Root>
    </>
  );
};
