import { createFileRoute } from '@tanstack/react-router';
import { ApplicantList } from '../../../features/onboarding-offboarding/applicant-list/applicant-list';

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
      <ApplicantList />
    </div>
  );
}
