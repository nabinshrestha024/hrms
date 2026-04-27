import { Badge, HRCard, Switch } from '@erp/ui';

const leaveDeductionData = [
  {
    leaveTitle: 'Exclude Public Holidays from Leave Count',
    leaveSubTitle:
      'Holidays from the Mater Holiday Calendar will be automatically excluded',
    example: [
      'Dashain holidays:  Tuesday to Friday (4 days)',
      'Employee applies:   Monday to Saturday (6 days)',
      'System deducts: 2 days only (Monday + Saturday)',
    ],
  },
  {
    leaveTitle: 'Exlude Weekly Offs Working Days',
    leaveSubTitle:
      'Weekly off days (Saturday/Sunday) within leave period won’t be deducted unless Sandwich Rule applies',
    badge: 'Subject to Sandwich Rule',
  },
  {
    leaveTitle: 'Auto-Calculate Working Days',
    leaveSubTitle:
      'Automatically calculate actual working days when processing leave requests',
  },
];

export const LeaveDeduction = () => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0"
      >
        <div className="flex flex-col gap-4">
          {leaveDeductionData.map((leaveDeduction, index) => (
            <HRCard
              key={index}
              cardClassName="border border-border px-3 py-2.5 rounded-xl shadow-none"
              cardContentClassName="p-0 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <span className="text-[14px] font-medium leading-5 text-foreground">
                      {leaveDeduction.leaveTitle}
                    </span>
                    {leaveDeduction.badge && (
                      <Badge
                        variant="default"
                        className="text-[12px] font-semibold leading-4 text-foreground"
                      >
                        {leaveDeduction.badge}
                      </Badge>
                    )}
                  </div>
                  <Switch />
                </div>
                <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
                  {leaveDeduction.leaveSubTitle}
                </span>
              </div>
              {leaveDeduction.example && (
                <HRCard
                  cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-[#EFF6FF] shadow-none"
                  cardContentClassName="p-0 flex flex-col gap-1"
                >
                  <span className="text-[12px] font-medium leading-4 text-foreground">
                    Example Scenario :
                  </span>
                  {leaveDeduction.example.map((example, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                      <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
                        {example}
                      </span>
                    </div>
                  ))}
                </HRCard>
              )}
            </HRCard>
          ))}
        </div>
      </HRCard>
    </div>
  );
};
