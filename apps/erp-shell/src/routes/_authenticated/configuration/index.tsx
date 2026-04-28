import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const ConfigurationLeaveTypes = lazy(() =>
  import('../../../features/configuration/leave-type/leave-type-header').then(
    (m) => ({ default: m.ConfigurationLeaveTypes })
  )
);

export const Route = createFileRoute('/_authenticated/configuration/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Configuration',
    subbreadcrumb: 'Leave Type',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <ConfigurationLeaveTypes />
      </Suspense>
    </div>
  );
}
