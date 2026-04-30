import { Button, CustomAlert } from '@erp/ui';
import { Info } from 'lucide-react';
import { LeaveEncashmentForm } from './leave-encashment/leave-encashment-form';

export const LeaveEncashment = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-115 h-full overflow-auto flex flex-col gap-8">
        <CustomAlert
          title="Leave Encashment"
          description="Configure how unused leave balance is converted to cash. You can choose the salary 
          components to include and set limits on encashable days."
          icon={<Info className="w-4 h-4" />}
        />
        <LeaveEncashmentForm />
      </div>
      <div className="sticky bottom-0 z-10 bg-white p-6 rounded-b-xl border-t border-border flex justify-end gap-6">
        <Button
          type="button"
          variant="outline"
          className="text-[14px] font-medium leading-5 text-muted-foreground "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="flex gap-2  text-[14px] font-medium leading-5 text-white items-center"
          form="leave-encashment-form"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
