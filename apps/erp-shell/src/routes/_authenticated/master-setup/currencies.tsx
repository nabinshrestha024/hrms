import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const Currency = lazy(() =>
  import('../../../features/master-setup/currency-type/currency').then((m) => ({
    default: m.Currency,
  }))
);

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
      <Suspense fallback={null}>
        <Currency />
      </Suspense>
    </ContentShell>
  );
}
