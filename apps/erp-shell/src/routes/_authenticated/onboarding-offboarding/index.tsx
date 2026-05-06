import { createFileRoute } from '@tanstack/react-router';
import { JobOpening } from '../../../features/onboarding-offboarding/job-opening/job-opening';

export const Route = createFileRoute('/_authenticated/onboarding-offboarding/')(
  {
    component: RouteComponent,
    beforeLoad: () => ({
      breadcrumb: 'Onboarding & Offboarding',
      subbreadcrumb: 'Job Openings',
    }),
  }
);

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <JobOpening />
    </div>
  );
}
