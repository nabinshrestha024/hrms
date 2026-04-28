import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const WorkType = lazy(() =>
  import('../../../features/master-setup/work-type/work-type').then((m) => ({
    default: m.WorkType,
  }))
);

export const Route = createFileRoute('/_authenticated/master-setup/work-type')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Work Type',
  }),
});

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <Suspense fallback={null}>
        <WorkType />
      </Suspense>
    </ContentShell>
  );
}
