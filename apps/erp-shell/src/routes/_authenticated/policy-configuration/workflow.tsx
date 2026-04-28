import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const Workflow = lazy(() =>
  import('../../../features/policy-configuration/workflow/workflow').then(
    (m) => ({ default: m.Workflow })
  )
);

export const Route = createFileRoute(
  '/_authenticated/policy-configuration/workflow'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Policy Configuration',
    subbreadcrumb: 'Workflow',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Workflow</div>
      <Suspense fallback={null}>
        <Workflow />
      </Suspense>
    </div>
  );
}
