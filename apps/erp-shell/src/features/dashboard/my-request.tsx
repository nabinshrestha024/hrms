import { Badge, HRCard, Skeleton } from '@erp/ui';
import {
  useMyRequests,
  type MyRequest as MyRequestType,
} from '@erp/data-access';

export const MyRequest = () => {
  const { data, isLoading } = useMyRequests();
  const myRequestData: MyRequestType[] = data ?? [];

  if (isLoading) {
    return (
      <HRCard
        cardClassName="w-full h-99 py-6 pr-3 pl-6 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="flex flex-col gap-4 p-0"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          My Request
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

  return (
    <>
      <HRCard
        cardClassName="w-full h-99 py-6 pr-3 pl-6 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="flex flex-col gap-4 p-0"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          My Request
        </div>
        <div className="max-h-75  flex flex-col gap-3 overflow-auto pr-3 notice-scroll">
          {myRequestData.map((val) => (
            <HRCard
              cardClassName="p-2 bg-background rounded-xl border-none shadow-none"
              cardContentClassName="p-0 flex justify-between items-center"
              key={val.id}
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <span className="text-[14px] leading-5 font-medium text-foreground">
                    {val.type}
                  </span>
                  <span className="text-[8px] leading-4 font-normal text-secondary-foreground">
                    {val.id}
                  </span>
                </div>
                <span className="text-[12px] leading-4 font-normal text-secondary-foreground">
                  {val.subType} . {val.day} . {val.date}
                </span>
              </div>
              <div
                className={`h-6 py-1 px-3 rounded-[400px] font-semibold text-[12px] leading-4`}
              >
                {val.status === 'Pending' && (
                  <Badge
                    variant="warning"
                    className="border border-chart-4 bg-chart-6"
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
      </HRCard>
    </>
  );
};
