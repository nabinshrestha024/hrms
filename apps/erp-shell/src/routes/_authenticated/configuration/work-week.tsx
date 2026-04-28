import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const WorkWeekForm = lazy(() =>
  import('../../../features/configuration/work-week/work-week-form').then(
    (m) => ({ default: m.WorkWeekForm })
  )
);

export const Route = createFileRoute('/_authenticated/configuration/work-week')(
  {
    component: RouteComponent,
    beforeLoad: () => ({
      breadcrumb: 'Configuration',
      subbreadcrumb: 'Work Week',
    }),
  }
);

function RouteComponent() {
  return (
    <ContentShell title="Company Profile">
      <Suspense fallback={null}>
        <WorkWeekForm />
      </Suspense>
    </ContentShell>
  );
}
