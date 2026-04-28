import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const ReviewApprovalManagement = lazy(() =>
  import(
    '../../../features/document-management/review-approval/review-approval-management'
  ).then((m) => ({ default: m.ReviewApprovalManagement }))
);

export const Route = createFileRoute(
  '/_authenticated/document-management/review-approval'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Document Management',
    subbreadcrumb: 'Review Approval',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <ReviewApprovalManagement />
      </Suspense>
    </div>
  );
}
