import { HRLabel } from '@erp/ui';
import { UserCard } from '../../../components/user-card';

export const RequestApprover = () => {
  return (
    <div className="flex flex-col gap-4">
      <HRLabel labelClassName="text-[14px] text-foreground font-medium leading-5">
        Request Workflow Approvers
      </HRLabel>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserCard
          employeeId="EID 014"
          employeeName="Samita Waiba"
          department="FrontEnd Lead"
        />

        <UserCard
          employeeId="EID 016"
          employeeName="Ramesh Sharma"
          department="HR Manager"
        />
      </div>
    </div>
  );
};
