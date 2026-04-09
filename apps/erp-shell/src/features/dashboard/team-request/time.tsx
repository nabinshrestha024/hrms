import { Badge, HRCard } from '@erp/ui';
import { teamRequestData } from '../schema/team-request-data';

export const Time = () => {
  const timeRequests = teamRequestData.filter(
    (val) => val.type === 'Time Correction'
  );

  return (
    <div className="h-60 flex flex-col gap-3 overflow-auto pr-3 notice-scroll">
      {timeRequests.map((val, index) => (
        <HRCard
          key={index}
          cardClassName="p-2 bg-background rounded-xl border-none shadow-none"
          cardContentClassName="p-0 flex justify-between items-center"
        >
          <div className="flex gap-1 items-center">
            <div className="w-12 h-12 ">
              <img
                src="/Image.png"
                alt="profile"
                className="rounded-[400px] w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[14px] leading-5 font-medium text-foreground">
                {val.name}
              </span>

              <span className="text-[12px] leading-4 font-normal text-secondary-foreground">
                {val.hours} {val.subType} . {val.date}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <Badge
              variant="warning"
              className="border border-chart-4 bg-[#FEFCE8]"
            >
              Pending
            </Badge>

            <Badge variant="secondary">Approved</Badge>

            <Badge variant="outline" className="border-border">
              Reject
            </Badge>
          </div>
        </HRCard>
      ))}
    </div>
  );
};
