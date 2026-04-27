import { ContentShell } from '@erp/ui';
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
    <ContentShell className="bg-background">
      <JobLevel />
    </ContentShell>
  );
}
