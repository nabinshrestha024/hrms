import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
// Note: nuqs/adapters/tanstack-router is experimental.
// Using nuqs/adapters/react which works with any React SPA (including TanStack Router).
import { Toaster } from '@erp/ui';

// ---------------------------------------------------------------------------
// Error Boundary
// ---------------------------------------------------------------------------

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
          <h1 className="text-3xl font-bold text-destructive">
            Something went wrong
          </h1>
          <p className="max-w-md text-muted-foreground">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// 404 Not-Found Component
// ---------------------------------------------------------------------------

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-lg text-muted-foreground">Page not found</p>
      <Link
        to="/dashboard"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pending / Loading Component
// ---------------------------------------------------------------------------

function RootPending() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root Route
// ---------------------------------------------------------------------------

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  pendingComponent: RootPending,
});

function RootLayout() {
  return (
    <NuqsAdapter>
      <ErrorBoundary>
        <Outlet />
        <Toaster />
      </ErrorBoundary>
    </NuqsAdapter>
  );
}
