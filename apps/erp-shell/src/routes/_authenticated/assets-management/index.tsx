import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const CategoryManagement = lazy(() =>
  import(
    '../../../features/assets-management/category/category-management'
  ).then((m) => ({ default: m.CategoryManagement }))
);

export const Route = createFileRoute('/_authenticated/assets-management/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Assets Management',
    subbreadcrumb: 'Category',
  }),
});

function RouteComponent() {
  return (
    <ContentShell title="Category" titleClassName="lg:px-12 px-6">
      <div className="px-6 pt-0 pb-32.5">
        <Suspense fallback={null}>
          <CategoryManagement />
        </Suspense>
      </div>
    </ContentShell>
  );
}
