import { createFileRoute } from '@tanstack/react-router';
import { BranchManagement } from '../../../features/company-setup/branch/branch-management';

export const Route = createFileRoute('/_authenticated/company-setup/branch')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Company Setup',
    subbreadcrumb: 'Branch Management',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <BranchManagement />
    </div>
  );
}
