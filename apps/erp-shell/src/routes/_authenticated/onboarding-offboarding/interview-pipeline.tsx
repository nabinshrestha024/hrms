import { createFileRoute } from '@tanstack/react-router';
import { InterviewPipeline } from '../../../features/onboarding-offboarding/interview-pipeline/interview-pipeline';

export const Route = createFileRoute(
  '/_authenticated/onboarding-offboarding/interview-pipeline'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Onboarding & Offboarding',
    subbreadcrumb: 'Interview Pipeline',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <InterviewPipeline />
    </div>
  );
}
