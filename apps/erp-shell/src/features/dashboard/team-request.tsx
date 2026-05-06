import { HRCard, HRTabs, Skeleton } from '@erp/ui';
import {
  useTeamRequests,
  type TeamRequest as TeamRequestType,
} from '@erp/data-access';
import { Leave } from './team-request/leave';
import { OT } from './team-request/ot';
import { Time } from './team-request/time';

export const TeamRequest = () => {
  const { data, isLoading } = useTeamRequests();
  const teamRequests: TeamRequestType[] = data ?? [];

  if (isLoading) {
    return (
      <HRCard
        cardClassName="w-full max-h-99 py-6 pl-6 pr-3 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="flex flex-col gap-4 p-0"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          Team Request
        </div>
        <div className="flex gap-4 border-b border-border pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>
        <div className="flex flex-col gap-3 pr-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center p-2">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </HRCard>
    );
  }

  const tabsData = [
    {
      id: 1,
      value: 'Leave',
      triggerText: 'Leave',
      content: <Leave data={teamRequests} />,
    },
    {
      id: 2,
      value: 'OT',
      triggerText: 'OT',
      content: <OT data={teamRequests} />,
    },
    {
      id: 3,
      value: 'Time',
      triggerText: 'Time',
      content: <Time data={teamRequests} />,
    },
  ];
  return (
    <>
      <HRCard
        cardClassName="w-full h-99 py-6 pl-6 pr-3 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="flex flex-col gap-4 p-0"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          Team Request
        </div>
        <HRTabs
          defaultValue="Leave"
          tabClassName=" flex flex-col gap-3"
          tabListClassName="flex gap-6 py-2 px-0 bg-white rounded-none "
          tabList={tabsData}
          tabTriggerClassName="w-full h-9 rounded-none data-[state=active]:text-primary data-[state=active]:bg-white data-[state=active]:rounded-none data-[state=active]:shadow-none px-[44.83px] py-[6px] text-[14px] font-medium leading-5 text-secondary-foreground  data-[state=active]:border-b-2 data-[state=active]:border-b-primary"
          tabsContentClassName="rounded-[8px] bg-white "
        />
      </HRCard>
    </>
  );
};
