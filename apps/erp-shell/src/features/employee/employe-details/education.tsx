import { AddEducationForm } from './education/add-education-form';
import { educationData } from '../schema/EducationData';
import { Button, HRCard } from '@erp/ui';
import { Edit, Plus, Trash } from 'lucide-react';

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
            cardClassName="p-6 border border-[#E4E4E7] rounded-xl shadow-sm"
            cardContentClassName="p-0 "
            key={index}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] leading-4 font-semibold text-black">
                  {val.qualification}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] leading-4 font-normal text-[#09090B]">
                    {val.university}
                  </span>
                  <span className="text-[12px] leading-4 font-normal text-[#71717A]">
                    {val.endYear} - Completed
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-[#F4F4F5] rounded-sm p-1 w-6 h-6">
                  <Edit className="text-[16px] font-black" />
                </div>

                <div className="bg-[#FFE2E2] rounded-sm p-1 w-6 h-6">
                  <Trash fill="#E7000B" />
                </div>
              </div>
            </div>
          </HRCard>
        ))}
      </div>
    </>
  );
};
