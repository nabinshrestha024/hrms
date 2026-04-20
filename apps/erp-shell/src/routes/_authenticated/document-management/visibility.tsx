import { createFileRoute } from '@tanstack/react-router';
import { VisibilityManagement } from '../../../features/document-management/visibility/visibility-management';

export const Route = createFileRoute(
  '/_authenticated/document-management/visibility'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Visibility',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <VisibilityManagement />
    </div>
  );
}
