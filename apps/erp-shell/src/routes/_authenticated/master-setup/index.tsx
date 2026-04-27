import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Holiday } from '../../../features/master-setup/holiday/holiday';

export const Route = createFileRoute('/_authenticated/master-setup/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Holiday Type',
  }),
});

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <Holiday />
    </ContentShell>
  );
}
