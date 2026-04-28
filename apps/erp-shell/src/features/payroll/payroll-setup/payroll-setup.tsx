import { HRCard } from '@erp/ui';
import { PayrollSetupDetail } from './payroll-setup-tab/payroll-tabs';

export const PayrollSetup = () => {
  return (
    <div className="px-6 pb-6">
      <HRCard
        cardClassName="px-6 pt-6 pb-0 border-none shadow-none rounded-xl bg-white"
        cardContentClassName="p-0"
      >
        <PayrollSetupDetail />
      </HRCard>
    </div>
  );
};
