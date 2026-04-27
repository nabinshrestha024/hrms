import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LeaveRequest } from '../../../features/leave-management/leave-request/leave-request';

export const Route = createFileRoute('/_authenticated/leave-management/')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Leave', subbreadcrumb: 'Leave Request' }),
});

function RouteComponent() {
  return (
    <ContentShell title="Leave Request" padded>
      <LeaveRequest />
    </ContentShell>
  );
}
