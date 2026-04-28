import { Component, Suspense, type ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Skeleton } from '../primitives/skeleton';

// ---------------------------------------------------------------------------
// QueryBoundary — Suspense + error boundary + Skeleton fallback in one
// component. Wraps query consumers so feature components don't have to
// hand-roll loading + error UI for each call site.
//
// Usage:
//   <QueryBoundary>
//     <EmployeeList />   // hooks call useEmployees({ suspense: true })
//   </QueryBoundary>
//
// Custom fallback / error rendering:
//   <QueryBoundary
//     fallback={<MyFancyLoader />}
//     errorFallback={(err, retry) => <Banner>{err.message}</Banner>}
//   >
//     ...
//   </QueryBoundary>
// ---------------------------------------------------------------------------

interface QueryErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
  errorFallback?: (error: Error, reset: () => void) => ReactNode;
}

interface QueryErrorBoundaryState {
  error: Error | null;
}

class QueryErrorBoundary extends Component<
  QueryErrorBoundaryProps,
  QueryErrorBoundaryState
> {
  override state: QueryErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): QueryErrorBoundaryState {
    return { error };
  }

  reset = () => {
    this.props.onReset();
    this.setState({ error: null });
  };

  override render() {
    const { error } = this.state;
    if (error) {
      if (this.props.errorFallback) {
        return this.props.errorFallback(error, this.reset);
      }
      return (
        <div
          role="alert"
          className="flex flex-col gap-2 p-4 border border-destructive/40 bg-destructive/5 rounded-md text-sm"
        >
          <span className="font-medium text-destructive">
            Something went wrong
          </span>
          <span className="text-muted-foreground">{error.message}</span>
          <button
            type="button"
            onClick={this.reset}
            className="self-start text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface QueryBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: (error: Error, reset: () => void) => ReactNode;
}

export function QueryBoundary({
  children,
  fallback,
  errorFallback,
}: QueryBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <QueryErrorBoundary onReset={reset} errorFallback={errorFallback}>
      <Suspense fallback={fallback ?? <DefaultSkeleton />}>{children}</Suspense>
    </QueryErrorBoundary>
  );
}

function DefaultSkeleton() {
  // Three rows is roughly a list-page worth — enough to communicate
  // "loading" without being aggressively tall on small panels.
  return (
    <div className="flex flex-col gap-3 p-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}
