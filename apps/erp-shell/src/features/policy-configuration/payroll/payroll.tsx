import { HRCard } from '@erp/ui';
import { LossOfPayCard } from './loss-of-pay-card';
import { ArrearManagementCard } from './arrear-management-card';

export const Payroll = () => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <LossOfPayCard />
        <ArrearManagementCard />
      </HRCard>
    </div>
  );
};
