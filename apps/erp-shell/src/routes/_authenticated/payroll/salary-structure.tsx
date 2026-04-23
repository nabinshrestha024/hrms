import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/payroll/salary-structure'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Payroll Management',
    subbreadcrumb: 'Salary Structure',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">
        Salary Structure
      </div>
    </div>
  );
}
