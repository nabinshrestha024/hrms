import { Badge, HRCard } from '@erp/ui';
import { myRequestData } from './schema/my-request-data';

export const MyRequest = () => {
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
          {myRequestData.map((val, index) => (
            <HRCard
              cardClassName="p-2 bg-background rounded-xl border-none shadow-none"
              cardContentClassName="p-0 flex justify-between items-center"
              key={index}
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
