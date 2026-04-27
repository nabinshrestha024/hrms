import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { AttendanceDetail } from '../../../features/attendance/attendance-record/attendance-detail';

export const Route = createFileRoute('/_authenticated/attendance/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Attendance Management',
    subbreadcrumb: 'Attendance Record',
  }),
});

function RouteComponent() {
  return (
    <ContentShell title="Attendance Record" padded>
      <AttendanceDetail />
    </ContentShell>
  );
}
