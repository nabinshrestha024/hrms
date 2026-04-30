import { Badge, HRCard, Slider } from '@erp/ui';

export const GrossSalaryPercentage = () => {
  return (
    <HRCard
      cardContentClassName="p-0 flex flex-col gap-6"
      cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-muted"
    >
      <div className="flex justify-between items-center">
        <span className="text-[18px] font-medium leading-6 text-foreground">
          Gross Salary Percentage
        </span>
        <Badge variant="default" className="bg-white text-foreground">
          60%
        </Badge>
      </div>
      <div className="flex flex-col gap-4">
        <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
            10%
          </span>
          <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
            Common: 60%
          </span>
          <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
            100%
          </span>
        </div>
        <HRCard
          cardContentClassName="p-0 flex gap-2"
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <span className="text-[14px] font-medium leading-5 text-foreground">
            Example
          </span>
          <span className="text-[12px] font-normal leading-4 text-foreground">
            If Gross Salary is Rs. 100,000 and percentage is 60%, then Dashain
            Bonus = Rs. 60,000
          </span>
        </HRCard>
      </div>
    </HRCard>
  );
};
