import type { ReactNode } from 'react';
import { Card as Root, CardContent } from '../../primitives/card';

interface CardProps {
  children: ReactNode;
  cardContentClassName?: string;
  cardClassName?: string;
}

export const HRCard = ({
  children,
  cardContentClassName,
  cardClassName,
}: CardProps) => {
  return (
    <>
      <Root className={`${cardClassName}`}>
        <CardContent className={cardContentClassName}>{children}</CardContent>
      </Root>
    </>
  );
};
