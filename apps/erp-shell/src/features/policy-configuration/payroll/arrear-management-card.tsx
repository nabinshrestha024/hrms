import { CustomAlert, HRCard, HRSelect, Switch } from '@erp/ui';
import { ArrowRight, TriangleAlert } from 'lucide-react';
export const ArrearManagementCard = () => {
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <span className="text-[16px] leading-6 font-medium text-foreground">
        Arrear Management
      </span>
      <div className="flex flex-col gap-4">
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-1 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Enable Auto Arrear Calculation
            </span>

            <Switch />
          </div>
          <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
            Automatically create positive adjustments when unpaid leave is
            cancelled
          </span>
        </HRCard>
        <div className="flex flex-col gap-1">
          <HRSelect
            Label="Arrear Processing"
            triggerClassName="w-[505px]"
            placeholder="Process in Next Month’s Salary"
            selectData={[]}
          />
          <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
            When admin cancels an unpaid leave after salary is processed
          </span>
        </div>
        <CustomAlert
          className="bg-[#FEFCE8] border border-[#FEF9C2]"
          title="Admin Correction Flow"
          titleClassName="text-[#894B00]"
          icon={<TriangleAlert className="w-4 h-4 text-[#894B00]" />}
          description={
            <div className="flex gap-1 items-center  text-[#894B00]">
              <span> If admin cancels unpaid leave after salary is paid</span>
              <ArrowRight className="w-4 h-4 text-[#894B00]" />
              <span>System auto create arrear</span>
              <ArrowRight className="w-4 h-4 text-[#894B00]" />
              <span>Employee receives reimbursement in next month</span>
            </div>
          }
        />
      </div>
    </HRCard>
  );
};
