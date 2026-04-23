import { createFileRoute } from '@tanstack/react-router';
import { SandwichRule } from '../../../features/policy-configuration/sandwich-rule/sandwich-rule';

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
      <SandwichRule />
    </div>
  );
}
