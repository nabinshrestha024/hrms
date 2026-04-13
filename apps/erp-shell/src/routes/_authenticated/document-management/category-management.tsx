import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/document-management/category-management'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Category Management' }),
});

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/document-management/category-management"!</div>
  );
}
