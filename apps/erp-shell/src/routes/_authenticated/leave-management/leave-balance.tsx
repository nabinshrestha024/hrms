import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LeaveBalanceCard } from '../../../features/employee/employee-details/leave-balance/leave-balance-card';

export const Route = createFileRoute(
  '/_authenticated/leave-management/leave-balance'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Leave', subbreadcrumb: 'Leave-balance' }),
});

function RouteComponent() {
  return (
    <ContentShell title="Leave Balance" padded>
      <LeaveBalanceCard />
    </ContentShell>
  );
}
