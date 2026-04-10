import { Link, useRouter } from '@tanstack/react-router';
import { Button } from '@erp/ui';
import { AlertTriangle } from 'lucide-react';

interface RouteErrorProps {
  error?: Error;
  reset?: () => void;
}

/**
 * Shared error UI used as `errorComponent` on protected routes.
 * Catches loader errors (e.g. failed `useEmployees`) and render errors.
 */
export function RouteError({ error, reset }: RouteErrorProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (reset) reset();
    router.invalidate();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {error?.message ?? 'Failed to load this page.'}
        </p>
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={handleRetry}>
          Try again
        </Button>
        <Button type="button" variant="secondary" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
