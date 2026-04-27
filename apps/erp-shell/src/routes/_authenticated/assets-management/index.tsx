import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { CategoryManagement } from '../../../features/assets-management/category/category-management';

export const Route = createFileRoute('/_authenticated/assets-management/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Assets Management',
    subbreadcrumb: 'Category',
  }),
});

function RouteComponent() {
  return (
    <ContentShell title="Category">
      <div className="px-6 pt-0 pb-32.5">
        <CategoryManagement />
      </div>
    </ContentShell>
  );
}
