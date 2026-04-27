import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Currency } from '../../../features/master-setup/currency-type/currency';

export const Route = createFileRoute('/_authenticated/master-setup/currencies')(
  {
    component: RouteComponent,
    beforeLoad: () => ({
      breadcrumb: 'Master Setup',
      subbreadcrumb: 'Currencies',
    }),
  }
);

function RouteComponent() {
  return (
    <ContentShell className="bg-background">
      <Currency />
    </ContentShell>
  );
}
