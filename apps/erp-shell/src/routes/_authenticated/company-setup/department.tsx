import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const DepartmentManagement = lazy(() =>
  import(
    '../../../features/company-setup/department/department-management'
  ).then((m) => ({ default: m.DepartmentManagement }))
);

export const Route = createFileRoute(
  '/_authenticated/company-setup/department'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Company Setup',
    subbreadcrumb: 'Department Management',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <DepartmentManagement />
      </Suspense>
    </div>
  );
}
