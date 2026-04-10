import { createFileRoute } from '@tanstack/react-router';
import { EmployeeManagement } from '../../../features/employee/employee-management';

export const Route = createFileRoute('/_authenticated/employee/')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Employee Management' }),
});

function RouteComponent() {
  return (
    <>
      <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB]">
        <EmployeeManagement />
      </div>
    </>
  );
}
