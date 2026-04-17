import { Button, FormDialog } from '@erp/ui';
import { Plus } from 'lucide-react';
import { LeaveWorkFlow } from './leave-work-flow';

export const LeaveTimeOff = () => {
  return (
    <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
      <div className="flex justify-between">
        <div className="text-[18px] font-medium leading-7 text-[#09090B]">
          Approval Workflow
        </div>

        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              className="flex gap-2 cursor-pointer text-[14px] font-medium leading-5 text-white"
            >
              <Plus className="text-[16px]" />
              Add Step
            </Button>
          }
          title="Add Approval Step"
          size="lg"
          okText="Add"
        >
          {({ close: _close }: { close: () => void }) => (
            // TODO: replace with the real <AddApprovalStepForm onSuccess={_close} />
            <div className="text-sm text-secondary-foreground">
              Approval step form goes here.
            </div>
          )}
        </FormDialog>
      </div>
      <LeaveWorkFlow />
    </div>
  );
};
