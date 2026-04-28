import { HRCard } from '@erp/ui';

export const UserEmergencyDetail = () => {
  return (
    <>
      <HRCard
        cardClassName="border-none p-0 rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[16px] font-medium leading-6 text-foreground">
          Emergency Contact
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Emergency Contact
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              9800000000
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Emergency Contact Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Sita Thapa
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Emergency Contact Relation
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Relative
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
