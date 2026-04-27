import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { WorkWeekForm } from '../../../features/configuration/work-week/work-week-form';

export const Route = createFileRoute('/_authenticated/configuration/work-week')(
  {
    component: RouteComponent,
    beforeLoad: () => ({
      breadcrumb: 'Configuration',
      subbreadcrumb: 'Work Week',
    }),
  }
);

function RouteComponent() {
  return (
    <ContentShell title="Company Profile">
      <WorkWeekForm />
    </ContentShell>
  );
}
