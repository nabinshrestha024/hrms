import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/payroll')({
  component: PlaceholderPage,
  beforeLoad: () => ({ breadcrumb: 'Payroll' }),
});

function PlaceholderPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize">payroll</h1>
      <p className="mt-2 text-muted-foreground">This module will be implemented in a future phase.</p>
    </div>
  );
}
