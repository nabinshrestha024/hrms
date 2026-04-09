import { HRCard } from '@erp/ui';
import { employees } from '../../schema/EmployeeData';

export const FinancialDetailDisplay = ({
  employeeId,
}: {
  employeeId: string;
}) => {
  const employee = employees.find((emp) => emp.employeeId === employeeId);

  return (
    <>
      <HRCard
        cardClassName="bg-white border-none p-0 rounded-none shadow-none"
        cardContentClassName="p-0"
      >
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Gross Salary
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.grossSalary}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Basic Salary
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.basicSalary}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Bank Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.bankName}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Bank Account Number
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.bankAccountNumber}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Bank Account Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.bankAccountName}
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
