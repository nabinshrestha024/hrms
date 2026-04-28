import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const LeaveType = lazy(() =>
  import('../../../features/master-setup/leave-type/leave-type').then((m) => ({
    default: m.LeaveType,
  }))
);

export const Route = createFileRoute('/_authenticated/master-setup/leave-type')(
  {
    component: RouteComponent,
    beforeLoad: () => ({
      breadcrumb: 'Master Setup',
      subbreadcrumb: 'Leave Type',
    }),
  }
);

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <Suspense fallback={null}>
        <LeaveType />
      </Suspense>
    </ContentShell>
  );
}
