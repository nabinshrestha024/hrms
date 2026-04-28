import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const EmployeeManagement = lazy(() =>
  import('../../../features/employee/employee-management').then((m) => ({
    default: m.EmployeeManagement,
  }))
);

export const Route = createFileRoute('/_authenticated/employee/')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Employee Management' }),
});

function RouteComponent() {
  return (
    <ContentShell>
      <Suspense fallback={null}>
        <EmployeeManagement />
      </Suspense>
    </ContentShell>
  );
}
