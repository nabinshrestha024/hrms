import { Badge, HRCard } from '@erp/ui';
import { InitialsCard } from '../../../../components/initial-avatar';
import { LeaveBalanceTabs } from './leave-balance-tab';
import { leaveBalance } from '../../schema/leave-balance-data';

interface LeaveDetailsProps {
  leaveData: leaveBalance;
}

export const LeaveDetails = ({ leaveData }: LeaveDetailsProps) => {
  const remaining = leaveData.total - leaveData.used;
  return (
    <>
      <div className="flex flex-col">
        <HRCard
          cardClassName="py-3 px-0 border-none shadow-none rounded-none bg-white"
          cardContentClassName="p-0 flex justify-between items-end"
        >
          <div className="flex gap-2 ">
            <InitialsCard name="John Doe" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[16px] font-medium leading-6 text-foreground">
                John Doe
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium leading-5 text-foreground">
                  {leaveData.leave}
                </span>
                <Badge variant="default">Monthly</Badge>
              </div>
            </div>
          </div>
          <span className="text-[14px] font-medium leading-4 text-foreground">
            Current: {remaining}
          </span>
        </HRCard>
        <LeaveBalanceTabs leaveId={leaveData.id} />
      </div>
    </>
  );
};
