import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { WorkRecord } from '../../../features/attendance/work-record/work-record';

export const Route = createFileRoute('/_authenticated/attendance/work-record')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Attendance Management',
    subbreadcrumb: 'Work Record',
  }),
});

function RouteComponent() {
  return (
    <ContentShell title="Work Record" padded>
      <WorkRecord />
    </ContentShell>
  );
}
