import { Button, FormDialog } from '@erp/ui';
import { Plus } from 'lucide-react';
import { AssignLeaveForm } from './leave-balance/assign-leave-form';
import { LeaveBalanceCard } from './leave-balance/leave-balance-card';

export const LeaveBalance = () => {
  return (
    <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
      <div className="flex justify-between items-center">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Leave Balance
        </div>

        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              className="flex gap-2 items-center text-[14px] font-medium leading-5"
            >
              <Plus className="w-4 h-4 " />
              Assign Leave
            </Button>
          }
          title="Assign Leave Type"
          size="lg"
          okText="Assign to Employee"
          dialogClassName="sm:max-w-[738px] max-h-[120vh]"
          componentClassName="sm:max-w-185"
        >
          {({ close }: { close: () => void }) => (
            <AssignLeaveForm onSuccess={close} />
          )}
        </FormDialog>
      </div>
      <LeaveBalanceCard />
    </div>
  );
};
