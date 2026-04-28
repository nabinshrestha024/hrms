import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const MyRequestDetails = lazy(() =>
  import('../../../features/leave-management/my-request/my-request').then(
    (m) => ({ default: m.MyRequestDetails })
  )
);

export const Route = createFileRoute(
  '/_authenticated/leave-management/my-request'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Leave', subbreadcrumb: 'My Request' }),
});

function RouteComponent() {
  return (
    <ContentShell title="My Request" padded>
      <Suspense fallback={null}>
        <MyRequestDetails />
      </Suspense>
    </ContentShell>
  );
}
