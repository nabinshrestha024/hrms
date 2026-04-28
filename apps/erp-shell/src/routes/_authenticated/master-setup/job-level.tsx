import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const JobLevel = lazy(() =>
  import('../../../features/master-setup/job-level/job-level').then((m) => ({
    default: m.JobLevel,
  }))
);

export const Route = createFileRoute('/_authenticated/master-setup/job-level')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Job level',
  }),
});

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <Suspense fallback={null}>
        <JobLevel />
      </Suspense>
    </ContentShell>
  );
}
