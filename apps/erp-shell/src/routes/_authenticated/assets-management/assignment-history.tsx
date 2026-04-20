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
    <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB] ">
      <AssignmentHistory />
    </div>
  );
}
