import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/document-management/assign-document'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Assign Document' }),
});

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/document-management/assign-document"!</div>
  );
}
