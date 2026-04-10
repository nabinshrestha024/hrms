import { AddEducationForm } from './education/add-education-form';
import { Button, HRCard } from '@erp/ui';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { educationData } from '../Schema/EducationData';
import { IconButton } from '../../../components/icon-button';

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

export const Education = ({ onOpen }: GetColumnsProps) => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="flex justify-between items-center">
          <div className="text-[18px] font-medium leading-7 text-[#09090B]">
            Education
          </div>

          <Button
            type="button"
            variant="secondary"
            className="flex gap-2 items-center text-[14px] font-medium leading-5"
            onClick={() => {
              onOpen({
                modalTitle: 'Education Details',
                title: 'Education Details',
                okText: 'Add',
                size: 'lg',
                cancelText: 'Cancel',
                formId: 'education',
                component: <AddEducationForm />,
              });
            }}
          >
            <Plus className="text-[16px] " />
            Add Education
          </Button>
        </div>
        {educationData.map((val, index) => (
          <HRCard
            cardClassName="p-6 border border-[#E4E4E7] rounded-xl shadow-sm bg-white"
            cardContentClassName="p-0 "
            key={index}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] leading-4 font-semibold text-black">
                  {val.qualification}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 font-normal text-foreground">
                    {val.university}
                  </span>
                  <span className="text-[12px] leading-4 font-normal text-secondary-foreground">
                    {val.endYear} - Completed
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <IconButton variant="default">
                  <Edit className="w-5 h-5 font-bold" />
                </IconButton>

                <IconButton variant="destructive">
                  <Trash2 className="w-5 h-5 font-bold" />
                </IconButton>
              </div>
            </div>
          </HRCard>
        ))}
      </div>
    </>
  );
};
