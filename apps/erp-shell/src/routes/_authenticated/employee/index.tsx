import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { EmployeeManagement } from '../../../features/employee/employee-management';

export const Route = createFileRoute('/_authenticated/employee/')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Employee Management' }),
});

function RouteComponent() {
  return (
    <ContentShell>
      <EmployeeManagement />
    </ContentShell>
  );
}
