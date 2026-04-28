import { Badge, HRCard, HRInput, HRSelect, Switch } from '@erp/ui';

export const LossOfPayCard = () => {
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <div className=" flex justify-between items-center">
        <span className="text-[16px] leading-6 font-medium text-foreground">
          Loss of Pay (LOP) Automation
        </span>
        <Badge variant="primary">Active</Badge>
      </div>
      <div className="flex flex-col gap-4">
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-1 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Enable Auto LOP Deduction
            </span>

            <Switch />
          </div>
          <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
            Automatically apply salary deduction for unpaid leave
          </span>
        </HRCard>
        <div className="grid grid-cols-2 gap-4">
          <HRSelect
            Label="Calculation Base"
            placeholder="Basic Salary"
            selectData={[]}
          />
          <HRInput Label="Days in Month (for calculation)" placeholder="30" />
        </div>
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-1 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Include Absent from Biometric
            </span>

            <Switch />
          </div>
          <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
            Count biometric absences as unpaid leave
          </span>
        </HRCard>
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-1 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-alert-background"
        >
          <span className="text-[14px] font-medium leading-5 text-foreground">
            LOP Deduction Formula:
          </span>

          <span className="text-[14px] font-normal leading-5 text-secondary-foreground bg-white p-2 rounded-[6px]">
            Deduction = (Basic Salary / 30 ) × Unpaid Days
          </span>
        </HRCard>
      </div>
    </HRCard>
  );
};
