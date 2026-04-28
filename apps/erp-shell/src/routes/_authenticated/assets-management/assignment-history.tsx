import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const AssignmentHistory = lazy(() =>
  import(
    '../../../features/assets-management/assignment-history/assignment-history'
  ).then((m) => ({ default: m.AssignmentHistory }))
);

export const Route = createFileRoute(
  '/_authenticated/assets-management/assignment-history'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Assets Management',
    subbreadcrumb: 'Assignment History',
  }),
});

function RouteComponent() {
  return (
    <ContentShell>
      <Suspense fallback={null}>
        <AssignmentHistory />
      </Suspense>
    </ContentShell>
  );
}
