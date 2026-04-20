import { createFileRoute } from '@tanstack/react-router';
import { JobLevel } from '../../../features/master-setup/job-level/job-level';

export const Route = createFileRoute('/_authenticated/master-setup/job-level')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Job level',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col bg-background ">
      <JobLevel />
    </div>
  );
}
