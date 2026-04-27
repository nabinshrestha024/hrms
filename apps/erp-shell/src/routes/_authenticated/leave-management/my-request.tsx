import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { MyRequestDetails } from '../../../features/leave-management/my-request/my-request';

export const Route = createFileRoute(
  '/_authenticated/leave-management/my-request'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Leave', subbreadcrumb: 'My Request' }),
});

function RouteComponent() {
  return (
    <ContentShell title="My Request" padded>
      <MyRequestDetails />
    </ContentShell>
  );
}
