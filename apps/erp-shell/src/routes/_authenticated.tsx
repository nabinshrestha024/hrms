import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
  Link,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { FormDialog, ShellLayout, Skeleton, type NavLinkProps } from '@erp/ui';
import { useAuth } from '@erp/auth';
import { useTenant } from '@erp/tenant';
import { AppBreadcrumb } from '../components/app-breadcrumb';

function RouterLink({ to, children, className }: NavLinkProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function AuthenticatedPending() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  pendingComponent: AuthenticatedPending,
  beforeLoad: () => ({
    breadcrumb: 'Home',
  }),
});

function AuthenticatedLayout() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { tenant, isDark, setIsDark } = useTenant();
  const { location } = useRouterState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const userInitials = user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <ShellLayout
      currentPath={location.pathname}
      brandName={tenant.branding.appTitle}
      userName={user?.name}
      userRole={
        user?.role === 'admin'
          ? 'Admin'
          : user?.role === 'hr_manager'
          ? 'HR Manager'
          : 'Employee'
      }
      userInitials={userInitials}
      modulesEnabled={tenant.modulesEnabled}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
      onLogout={logout}
      linkComponent={RouterLink}
    >
      <div className="px-6 pt-4 bg-background">
        <AppBreadcrumb />
      </div>
      <Outlet />
      <FormDialog />
    </ShellLayout>
  );
}
