import { useDialogFormStore } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { BranchManagement } from '../../../features/company-setup/branch/branch-management';

export const Route = createFileRoute('/_authenticated/company-setup/branch')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Branch Management' }),
});

function RouteComponent() {
  const { onOpen } = useDialogFormStore();
  return (
    <>
      <div className="w-full max-h-[calc(100vh-120px)] overflow-auto  bg-background">
        <BranchManagement onOpen={onOpen} />
      </div>
    </>
  );
}
