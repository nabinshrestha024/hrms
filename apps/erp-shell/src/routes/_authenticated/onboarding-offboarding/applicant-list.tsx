import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/onboarding-offboarding/applicant-list'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Onboarding & Offboarding',
    subbreadcrumb: 'Applicant List',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Applicant List</div>
    </div>
  );
}
