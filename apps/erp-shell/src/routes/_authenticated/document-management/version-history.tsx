import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/document-management/version-history'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Version History' }),
});

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/document-management/version-history"!</div>
  );
}
