import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const LeaveRequest = lazy(() =>
  import('../../../features/leave-management/leave-request/leave-request').then(
    (m) => ({ default: m.LeaveRequest })
  )
);

export const Route = createFileRoute('/_authenticated/leave-management/')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Leave', subbreadcrumb: 'Leave Request' }),
});

function RouteComponent() {
  return (
    <ContentShell title="Leave Request" padded>
      <Suspense fallback={null}>
        <LeaveRequest />
      </Suspense>
    </ContentShell>
  );
}
