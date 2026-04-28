import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const Directories = lazy(() =>
  import('../../../features/directories/directories').then((m) => ({
    default: m.Directories,
  }))
);

export const Route = createFileRoute('/_authenticated/directories/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Directories',
    subbreadcrumb: 'Employee Directories',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <Directories />
      </Suspense>
    </div>
  );
}
