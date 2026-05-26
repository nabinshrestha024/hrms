import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
  Link,
} from '@tanstack/react-router';
import { ShellLayout, Skeleton, type NavLinkProps } from '@erp/ui';
import { authReady, useAuth, useAuthStore } from '@erp/auth';
import { useTenant } from '@erp/tenant';
import { AppBreadcrumb } from '../components/app-breadcrumb';
import { RouteError } from '../components/route-error';
import { getVisibleModules, navModules } from '@erp/ui';

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
  errorComponent: RouteError,
  beforeLoad: async () => {
    // Wait for the initial session restore to complete before deciding.
    // Without this, child loaders would fire authenticated API calls
    // before the auth state is known.
    await authReady;
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
    return { breadcrumb: 'Dashboard' };
  },
});

function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const { tenant, isDark, setIsDark } = useTenant();
  const { location } = useRouterState();
  const visibleModules = getVisibleModules(
    navModules,
    user?.role ?? 'employee',
    tenant.modulesEnabled
  );

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
      navModules={visibleModules}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
      onLogout={logout}
      linkComponent={RouterLink}
    >
      <div className="px-6 lg:px-12 pt-4 bg-background">
        <AppBreadcrumb />
      </div>
      <Outlet />
    </ShellLayout>
  );
}
