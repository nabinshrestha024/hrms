import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/unauthorized')({
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive">403</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          You don't have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block text-sm text-primary underline"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
