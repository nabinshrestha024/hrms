import type { Employee } from '@erp/data-access';
import { HRCard } from '@erp/ui';

export const EmergencyDetailDisplay = ({
  employee,
}: {
  employee: Employee;
}) => {
  return (
    <>
      <HRCard
        cardClassName="border-none p-0 rounded-none shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[16px] font-medium leading-6 text-foreground">
          Emergency Contact
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Emergency Contact
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.emergencyContact}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Emergency Contact Name
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.emergencyContactName}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-medium leading-4 text-secondary-foreground">
              Emergency Contact Relation
            </span>
            <span className="text-[14px] font-medium leading-5 text-foreground">
              {employee?.emergencyContactRelation}
            </span>
          </div>
        </div>
      </HRCard>
    </>
  );
};
