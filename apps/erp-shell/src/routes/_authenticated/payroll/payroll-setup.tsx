import { createFileRoute } from '@tanstack/react-router';
import { HRCard } from '@erp/ui';
import { PayrollSetupDetail } from '../../../features/payroll/payroll-setup/payroll-setup-tab/payroll-tabs';

export const Route = createFileRoute('/_authenticated/payroll/payroll-setup')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Payroll Management',
    subbreadcrumb: 'Payroll setup',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-84px)] overflow-auto bg-background">
      <div className="text-[20px] font-semibold px-12 py-6">Payroll setup</div>
      <div className="px-6 pb-6">
        <HRCard
          cardClassName="px-6 pt-6 pb-0 border-none shadow-none rounded-xl bg-white"
          cardContentClassName="p-0"
        >
          <PayrollSetupDetail />
        </HRCard>
      </div>
    </div>
  );
}
