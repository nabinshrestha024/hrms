import { HRCard } from '@erp/ui';
import { GeneratePayrollCard } from './generate-payroll-card';
import { GeneratePayrollBody } from './generate-payroll-body';

export const GeneratePayroll = () => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <GeneratePayrollCard />
        <GeneratePayrollBody />
      </HRCard>
    </div>
  );
};
