import { useDialogFormStore } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { DepartmentManagement } from '../../../features/company-setup/department/department-management';

export const Route = createFileRoute(
  '/_authenticated/company-setup/department'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Department Management' }),
});

function RouteComponent() {
  const { onOpen } = useDialogFormStore();
  return (
    <>
      <div className="w-full max-h-[calc(100vh-120px)] overflow-auto  bg-background">
        <DepartmentManagement onOpen={onOpen} />
      </div>
    </>
  );
}
