import { Badge, HRCard, Switch } from '@erp/ui';
import { ArrowRight } from 'lucide-react';
import { approvalWorkflowData } from '../schema/WorkflowData';

export const ApprovalWorkflow = () => {
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <div className="text-[16px] leading-6 font-medium text-foreground">
        Approval Workflow
      </div>
      <div className="flex flex-col gap-4">
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-1 "
          cardClassName="px-3 py-2.5 border border-[#F1F5F9] rounded-[6px] shadow-none bg-[#F8FAFC]"
        >
          <span className="text-[14px] leading-5 font-medium text-foreground">
            Leave Approval Flow:
          </span>
          <div className="flex gap-1 justify-center items-center">
            <Badge variant="outline" className="text-secondary-foreground">
              Employee Apply
            </Badge>
            <ArrowRight className="w-3 h-3 text-secondary-foreground" />
            <Badge variant="primary" className="text-white bg-[#155DFC]">
              Manager Review
            </Badge>
            <ArrowRight className="w-3 h-3 text-secondary-foreground" />
            <Badge variant="secondary" className="text-white bg-badge-text-7">
              Approved
            </Badge>
          </div>
        </HRCard>
        <div className="grid grid-cols-2 gap-4">
          {approvalWorkflowData.map((approval, index) => (
            <HRCard
              key={index}
              cardClassName="border border-border px-3 py-2.5 rounded-xl shadow-none"
              cardContentClassName="p-0 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-medium leading-5 text-foreground">
                    {approval.approvalWorkflowTitle}
                  </span>

                  <Switch />
                </div>
                <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
                  {approval.approvalWorkflowSubTitle}
                </span>
              </div>
            </HRCard>
          ))}
        </div>
      </div>
    </HRCard>
  );
};
