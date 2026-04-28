import { UserEmployeeDetail } from './work-information/employee-details';
import { UserFinancialDetail } from './work-information/financial-details';

export const UserWorkInformation = () => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Work Information
        </div>
        <UserEmployeeDetail />
        <UserFinancialDetail />
      </div>
    </>
  );
};
