import { Button } from '@erp/ui';
import { OverTimeWorkFlow } from './over-time-work-flow';
import { Plus } from 'lucide-react';
type ModalSize = 'sm' | 'md' | 'lg';

interface GetColumnsProps {
  onOpen: <T extends string>(config: {
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    onCancel?: () => void;
  }) => void;
}
export const OverTimeRequest = ({ onOpen }: GetColumnsProps) => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="flex justify-between">
          <div className="text-[18px] font-medium leading-7 text-[#09090B]">
            Approval Workflow
          </div>

          <Button
            type="button"
            variant="secondary"
            className="flex gap-2 cursor-pointer text-[14px] font-medium leading-5 text-white"
            onClick={() => {
              onOpen({
                modalTitle: '',
                title: '',
                okText: 'Add',
                size: 'lg',
                cancelText: 'Cancel',
                formId: '',
                component: <></>,
              });
            }}
          >
            <Plus className="text-[16px]" />
            Add Step
          </Button>
        </div>
        <OverTimeWorkFlow />
      </div>
    </>
  );
};
