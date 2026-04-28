import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const LeaveBalanceCard = lazy(() =>
  import(
    '../../../features/employee/employee-details/leave-balance/leave-balance-card'
  ).then((m) => ({ default: m.LeaveBalanceCard }))
);

export const Route = createFileRoute(
  '/_authenticated/leave-management/leave-balance'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Leave', subbreadcrumb: 'Leave-balance' }),
});

function RouteComponent() {
  return (
    <ContentShell title="Leave Balance" padded>
      <Suspense fallback={null}>
        <LeaveBalanceCard />
      </Suspense>
    </ContentShell>
  );
}
