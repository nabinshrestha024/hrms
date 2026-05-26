import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const MyAttendanceDetails = lazy(() =>
  import('../../../features/attendance/my-attendance/my-attendance').then(
    (m) => ({ default: m.MyAttendanceDetails })
  )
);

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
    <ContentShell title="My Attendance" padded titleClassName="lg:px-12 px-6">
      <Suspense fallback={null}>
        <MyAttendanceDetails />
      </Suspense>
    </ContentShell>
  );
}
