import { createFileRoute } from '@tanstack/react-router';
import { CategoryManagement } from '../../../features/document-management/category-management/category-management';

export const Route = createFileRoute(
  '/_authenticated/document-management/category-management'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Category Management',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <CategoryManagement />
    </div>
  );
}
