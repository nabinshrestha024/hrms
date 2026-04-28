import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const Payroll = lazy(() =>
  import('../../../features/policy-configuration/payroll/payroll').then(
    (m) => ({ default: m.Payroll })
  )
);

export const Route = createFileRoute(
  '/_authenticated/policy-configuration/payroll'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Policy Configuration',
    subbreadcrumb: 'Payroll',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Payroll</div>
      <Suspense fallback={null}>
        <Payroll />
      </Suspense>
    </div>
  );
}
