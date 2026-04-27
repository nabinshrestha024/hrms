import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { WorkType } from '../../../features/master-setup/work-type/work-type';

export const Route = createFileRoute('/_authenticated/master-setup/work-type')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Work Type',
  }),
});

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <WorkType />
    </ContentShell>
  );
}
