import { createFileRoute } from '@tanstack/react-router';
import { ReviewApprovalManagement } from '../../../features/document-management/review-approval/review-approval-management';

export const Route = createFileRoute(
  '/_authenticated/document-management/review-approval'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Review Approval' }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <ReviewApprovalManagement />
    </div>
  );
}
