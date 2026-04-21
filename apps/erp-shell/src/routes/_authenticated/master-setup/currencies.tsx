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
    <div className="w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col bg-background ">
      <Currency />
    </div>
  );
}
