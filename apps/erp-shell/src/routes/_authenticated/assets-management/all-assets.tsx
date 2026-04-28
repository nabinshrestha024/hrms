import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const Assets = lazy(() =>
  import('../../../features/assets-management/all-assets/assets').then((m) => ({
    default: m.Assets,
  }))
);

export const Route = createFileRoute(
  '/_authenticated/assets-management/all-assets'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Assets Management',
    subbreadcrumb: 'All Assets',
  }),
});

function RouteComponent() {
  return (
    <ContentShell>
      <Suspense fallback={null}>
        <Assets />
      </Suspense>
    </ContentShell>
  );
}
