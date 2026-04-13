import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/document-management/document-template'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Document Template' }),
});

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/document-management/document-template"!</div>
  );
}
