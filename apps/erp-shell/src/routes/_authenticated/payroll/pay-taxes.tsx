import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/payroll/pay-taxes')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Payroll Management',
    subbreadcrumb: 'Pay & Taxes',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Pay & Taxes</div>
    </div>
  );
}
