import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { MyAttendanceDetails } from '../../../features/attendance/my-attendance/my-attendance';

export const Route = createFileRoute(
  '/_authenticated/attendance/my-attendance'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Attendance Management',
    subbreadcrumb: 'My Attendance',
  }),
});

function RouteComponent() {
  return (
    <ContentShell title="My Attendance" padded>
      <MyAttendanceDetails />
    </ContentShell>
  );
}
