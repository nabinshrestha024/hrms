import { createFileRoute } from '@tanstack/react-router';
import { OnbordingCard } from '../../../features/onboarding-offboarding/onboarding/onboarding-card';

export const Route = createFileRoute(
  '/_authenticated/onboarding-offboarding/onboard'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Onboarding & Offboarding',
    subbreadcrumb: 'Onboard',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Onboarding</div>

      <OnbordingCard />
    </div>
  );
}
