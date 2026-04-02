import type { ReactNode } from 'react';
import { useAbility } from './use-ability';

interface CanProps {
  action: string;
  subject: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ action, subject, children, fallback = null }: CanProps) {
  const ability = useAbility();
  return ability.can(action, subject) ? <>{children}</> : <>{fallback}</>;
}
