import { useCallback } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TenantProvider } from '@erp/tenant';
import {
  QueryProvider,
  ApiProvider,
  useApiClient,
  type ApiError,
} from '@erp/data-access';
import {
  AuthProvider,
  AbilityProvider,
  useAuthStore,
  AUTH_TOKEN_KEY,
} from '@erp/auth';
import { PluginProvider } from '@erp/plugin-core';
import { toast } from '@erp/ui';
import { routeTree } from '../routeTree.gen';

export interface BreadcrumbContext {
  breadcrumb?: string;
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {} as BreadcrumbContext,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

/**
 * Inner component that has access to ApiClient context.
 */
function AuthenticatedApp() {
  const api = useApiClient();

  const restoreSession = useCallback(async () => {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    try {
      const { data } = await api.get<{
        user: {
          id: string;
          email: string;
          name: string;
          role: string;
          tenantId: string;
        };
        permissions: string[];
      }>('/auth/session');
      return data;
    } catch {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
  }, [api]);

  return (
    <AuthProvider onRestoreSession={restoreSession}>
      <AbilityProvider>
        <PluginProvider plugins={[]}>
          <RouterProvider router={router} />
        </PluginProvider>
      </AbilityProvider>
    </AuthProvider>
  );
}

/**
 * Global API error handler — shows toast for all errors.
 * Handles both HTTP errors and envelope errors (code !== "200").
 *
 * ApiError shape:
 *   status: HTTP status (401, 404, etc.)
 *   code: envelope code string ("401", "VALIDATION_ERROR", etc.)
 *   message: human-readable error message from backend
 *   errors: array of detailed validation errors (if any)
 */
function handleApiError(error: ApiError) {
  const status = error.status;
  const isOnLoginPage = router.state.location.pathname === '/login';

  // Extract readable messages from errors array
  // Backend format: [{ errorCode: "AFEV2REF107", errorMessage: "'title' must be..." }]
  const description =
    error.errors?.length > 0
      ? error.errors.map((e) => e.errorMessage).join('\n')
      : error.message || 'An unexpected error occurred';

  if (status === 401) {
    // On login page → handled by the login form's onError callback, skip global toast
    if (isOnLoginPage) return;
    toast({
      title: 'Session expired',
      description: 'Please sign in again.',
      variant: 'destructive',
    });
  } else if (status === 403) {
    toast({
      title: 'Access denied',
      description,
      variant: 'destructive',
    });
  } else if (status === 404) {
    toast({
      title: 'Not found',
      description,
      variant: 'destructive',
    });
  } else if (status >= 500) {
    toast({
      title: 'Server error',
      description: 'Something went wrong. Please try again later.',
      variant: 'destructive',
    });
  } else {
    toast({
      title: 'Error',
      description,
      variant: 'destructive',
    });
  }
}

/**
 * Global 401 handler — logout and redirect to login.
 * Skips redirect if already on the login page (prevents loop).
 */
function handleUnauthorized() {
  const isOnLoginPage = router.state.location.pathname === '/login';
  if (isOnLoginPage) return;

  const { logout } = useAuthStore.getState();
  logout();
  router.navigate({ to: '/login' });
}

export default function App() {
  return (
    <TenantProvider>
      <QueryProvider>
        <ApiProvider
          baseUrl="/api"
          getToken={() => sessionStorage.getItem(AUTH_TOKEN_KEY)}
          onError={handleApiError}
          onUnauthorized={handleUnauthorized}
        >
          <AuthenticatedApp />
        </ApiProvider>
      </QueryProvider>
    </TenantProvider>
  );
}
