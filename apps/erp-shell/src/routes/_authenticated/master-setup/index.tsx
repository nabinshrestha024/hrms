import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const Holiday = lazy(() =>
  import('../../../features/master-setup/holiday/holiday').then((m) => ({
    default: m.Holiday,
  }))
);

export const Route = createFileRoute('/_authenticated/master-setup/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Holiday Type',
  }),
});

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <Suspense fallback={null}>
        <Holiday />
      </Suspense>
    </ContentShell>
  );
}
