import { HRCard } from '@erp/ui';
import { PayrollOptionCard } from './payroll-option-card';
import { SelectEmployeeHeader } from './select-employees-header';
import { EmployeeDetailHeader } from './employee-header';

export const GeneratePayrollBody = () => {
  return (
    <HRCard
      cardClassName="p-6 border border-border shadow-none rounded-xl"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <PayrollOptionCard />
      <SelectEmployeeHeader />
      <EmployeeDetailHeader />
    </HRCard>
  );
};
