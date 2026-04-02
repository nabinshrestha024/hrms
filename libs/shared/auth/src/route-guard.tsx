import type { ReactNode } from 'react';
import { Navigate } from '@tanstack/react-router';
import { useAuth } from './use-auth';
import { useAbility } from './use-ability';

interface RouteGuardProps {
  children: ReactNode;
  action?: string;
  subject?: string;
  redirectTo?: string;
}

export function RouteGuard({
  children,
  action,
  subject,
  redirectTo = '/unauthorized',
}: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const ability = useAbility();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (action && subject && !ability.can(action, subject)) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}
