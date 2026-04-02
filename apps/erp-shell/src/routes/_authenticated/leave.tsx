import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/leave')({
  component: PlaceholderPage,
  beforeLoad: () => ({ breadcrumb: 'Leave' }),
});

function PlaceholderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">leave</h1>
      <p className="mt-2 text-muted-foreground">
        This module will be implemented in a future phase.
      </p>
    </div>
  );
}
