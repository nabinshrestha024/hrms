import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const BranchManagement = lazy(() =>
  import('../../../features/company-setup/branch/branch-management').then(
    (m) => ({ default: m.BranchManagement })
  )
);

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
      <Suspense fallback={null}>
        <BranchManagement />
      </Suspense>
    </div>
  );
}
