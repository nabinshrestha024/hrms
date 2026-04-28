import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const LeaveDeduction = lazy(() =>
  import(
    '../../../features/policy-configuration/leave-deduction/leave-deduction'
  ).then((m) => ({ default: m.LeaveDeduction }))
);

export const Route = createFileRoute('/_authenticated/policy-configuration/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Policy Configuration',
    subbreadcrumb: 'Leave Deduction',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">
        Leave Deduction
      </div>
      <Suspense fallback={null}>
        <LeaveDeduction />
      </Suspense>
    </div>
  );
}
