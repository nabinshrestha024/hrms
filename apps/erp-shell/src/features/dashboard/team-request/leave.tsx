import { Badge, HRCard } from '@erp/ui';
import type { TeamRequest } from '@erp/data-access';

interface LeaveProps {
  data: TeamRequest[];
}

export const Leave = ({ data }: LeaveProps) => {
  const leaveRequests = data.filter((val) => val.type === 'Leave');

  return (
    <div className="h-60 flex flex-col gap-3 overflow-auto pr-3 notice-scroll">
      {leaveRequests.map((val) => (
        <HRCard
          key={val.id}
          cardClassName="p-2 bg-background rounded-xl border-none shadow-none"
          cardContentClassName="p-0 flex justify-between items-center"
        >
          <div className="flex gap-1 items-center">
            <div className="w-12 h-12 ">
              <img
                src={val.image ?? '/Image.png'}
                alt={val.name}
                className="rounded-[400px] w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[14px] leading-5 font-medium text-foreground">
                {val.name}
              </span>

              <span className="text-[12px] leading-4 font-normal text-secondary-foreground">
                {val.subType} . {val.day} . {val.date}
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            {val.status === 'Pending' && (
              <Badge
                variant="warning"
                className="border border-chart-4 bg-[#FEFCE8]"
              >
                Pending
              </Badge>
            )}
            {val.status === 'Approved' && (
              <Badge variant="secondary">Approved</Badge>
            )}
            {val.status === 'Rejected' && (
              <Badge variant="destructive">Rejected</Badge>
            )}
          </div>
        </HRCard>
      ))}
    </div>
  );
};
