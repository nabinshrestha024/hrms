import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const WorkRecord = lazy(() =>
  import('../../../features/attendance/work-record/work-record').then((m) => ({
    default: m.WorkRecord,
  }))
);

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
      <Suspense fallback={null}>
        <WorkRecord />
      </Suspense>
    </ContentShell>
  );
}
