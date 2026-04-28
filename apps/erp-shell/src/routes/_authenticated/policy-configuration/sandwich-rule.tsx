import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const SandwichRule = lazy(() =>
  import(
    '../../../features/policy-configuration/sandwich-rule/sandwich-rule'
  ).then((m) => ({ default: m.SandwichRule }))
);

export const Route = createFileRoute(
  '/_authenticated/policy-configuration/sandwich-rule'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Policy Configuration',
    subbreadcrumb: 'Sandwich Rule',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Sandwich Rule</div>
      <Suspense fallback={null}>
        <SandwichRule />
      </Suspense>
    </div>
  );
}
