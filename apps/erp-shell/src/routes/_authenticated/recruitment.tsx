import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/recruitment')({
  component: PlaceholderPage,
  beforeLoad: () => ({ breadcrumb: 'Recruitment' }),
});

function PlaceholderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">recruitment</h1>
      <p className="mt-2 text-muted-foreground">This module will be implemented in a future phase.</p>
    </div>
  );
}
