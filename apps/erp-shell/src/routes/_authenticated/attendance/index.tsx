import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const AttendanceDetail = lazy(() =>
  import(
    '../../../features/attendance/attendance-record/attendance-detail'
  ).then((m) => ({ default: m.AttendanceDetail }))
);

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
      <Suspense fallback={null}>
        <AttendanceDetail />
      </Suspense>
    </ContentShell>
  );
}
