import { HRAccordionCard, HRCard, HRInput, HRSelect, Switch } from '@erp/ui';
import { useState } from 'react';
export const PayrollOptionCard = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <HRCard
      cardClassName="p-6 border border-border rounded-xl shadow-none"
      cardContentClassName="p-0 "
    >
      <HRAccordionCard value="payroll-option" title="Payroll Option">
        <HRCard
          cardClassName="mt-6 p-6 border border-border rounded-[6px] bg-white shadow-none"
          cardContentClassName="p-0 flex flex-col gap-6"
        >
          <span className="text-[16px] leading-6 font-medium text-foreground">
            Festival Bonus & Leave Encashment
          </span>
          <div className="grid grid-cols-2 gap-4">
            <HRCard
              cardContentClassName="p-0 flex flex-col gap-1 "
              cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-muted"
            >
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-medium leading-5 text-foreground">
                  Dashain Bonus
                </span>

                <Switch />
              </div>
              <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
                1 month basic salary. Pro-rata for &lt;1 year.
              </span>
            </HRCard>
            <HRCard
              cardContentClassName="p-0 flex flex-col gap-3 "
              cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-muted"
            >
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-medium leading-5 text-foreground">
                  Leave Encashment
                </span>
                <Switch checked={enabled} onCheckedChange={setEnabled} />
              </div>
              {enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <HRInput Label="Days to Encash" placeholder="30" />

                  <HRSelect
                    Label="Calculate From"
                    placeholder="Basic Only"
                    selectData={[]}
                  />
                </div>
              )}
            </HRCard>
          </div>
        </HRCard>
      </HRAccordionCard>
    </HRCard>
  );
};
