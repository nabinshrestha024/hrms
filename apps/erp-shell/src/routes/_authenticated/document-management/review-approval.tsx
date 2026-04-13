import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/document-management/review-approval'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Review Approval' }),
});

function RouteComponent() {
  return (
    <div>Hello "/_authenticated/document-management/review-approval"!</div>
  );
}
