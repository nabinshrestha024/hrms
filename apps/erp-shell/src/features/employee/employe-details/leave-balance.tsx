import { Button } from '@erp/ui';
import { AssignLeaveForm } from './leave-balance/assign-leave-form';
import { Plus } from 'lucide-react';
import { LeaveBalanceCard } from './leave-balance/leave-balance-card';

type ModalSize = 'sm' | 'md' | 'lg';

interface GetColumnsProps {
  onOpen: <T extends string>(config: {
    componentClassName: string;
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    dialogClassName?: string;
    onCancel?: () => void;
  }) => void;
}

export const LeaveBalance = ({ onOpen }: GetColumnsProps) => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="flex justify-between items-center">
          <div className="text-[18px] font-medium leading-7 text-foreground">
            Leave Balance
          </div>

          <Button
            type="button"
            variant="secondary"
            className="flex gap-2 items-center text-[14px] font-medium leading-5"
            onClick={() => {
              onOpen({
                componentClassName: 'sm:max-w-185',
                modalTitle: 'Assign Leave Type',
                title: 'Assign Leave Type',
                okText: 'Assign to Employee',
                size: 'lg',
                cancelText: 'Cancel',
                formId: 'assignLeave',
                dialogClassName: 'sm:max-w-[738px] max-h-[120vh]',
                component: <AssignLeaveForm />,
              });
            }}
          >
            <Plus className="w-4 h-4 " />
            Assign Leave
          </Button>
        </div>
        <LeaveBalanceCard onOpen={onOpen} />
      </div>
    </>
  );
};
