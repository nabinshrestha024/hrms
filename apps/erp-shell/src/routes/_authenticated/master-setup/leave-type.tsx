import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { LeaveType } from '../../../features/master-setup/leave-type/leave-type';

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
      <LeaveType />
    </ContentShell>
  );
}
