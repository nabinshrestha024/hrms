import { Button } from '@erp/ui';
import { Plus } from 'lucide-react';
import { OverTimeWorkFlow } from './over-time-work-flow';

export const OverTimeRequest = () => {
  return (
    <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
      <div className="flex justify-between">
        <div className="text-[18px] font-medium leading-7 text-[#09090B]">
          Approval Workflow
        </div>

        <Button
          type="button"
          variant="secondary"
          className="flex gap-2 cursor-pointer text-[14px] font-medium leading-5 text-white"
        >
          <Plus className="text-[16px]" />
          Add Step
        </Button>
      </div>
      <OverTimeWorkFlow />
    </div>
  );
};
