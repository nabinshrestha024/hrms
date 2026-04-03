import type { ReactNode } from 'react';
import { Card as Root, CardContent } from '../../primitives/card';

interface CardProps {
  children: ReactNode;
  cardContnetClassName?: string;
  cardClassName?: string;
}

export const HRCard = ({
  children,
  cardContnetClassName,
  cardClassName,
}: CardProps) => {
  return (
    <>
      <Root className={`${cardClassName}`}>
        <CardContent className={cardContnetClassName}>{children}</CardContent>
      </Root>
    </>
  );
};
