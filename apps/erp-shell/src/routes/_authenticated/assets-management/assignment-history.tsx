import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { AssignmentHistory } from '../../../features/assets-management/assignment-history/assignment-history';

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
      <AssignmentHistory />
    </ContentShell>
  );
}
