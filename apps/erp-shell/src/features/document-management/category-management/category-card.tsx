import { Edit, File, Trash2 } from 'lucide-react';
import { CategoryType } from '../schema/CategoryData';
import { HRCard } from '@erp/ui';

export const CategoryManagementCard = ({ data }: { data: CategoryType[] }) => {
  return (
    <div className="px-6">
      <HRCard
        cardClassName="border-none shadow-none rounded-xl bg-white p-6"
        cardContentClassName="p-0 grid grid-cols-3 gap-6"
      >
        {data.map((item) => {
          return (
            <div className="flex flex-col gap-4 shadow-sm border border-border rounded-xl p-4">
              <div className="flex">
                <File className="text-primary bg-[#F3F3FE] rounded-xl p-3 w-10 h-10 cursor-pointer" />
                <div className="flex gap-3 ml-auto">
                  <Edit className="bg-muted rounded-lg p-1 w-6 h-6 cursor-pointer" />
                  <Trash2 className="bg-chart-3 text-[#E7000B] rounded-lg p-1 w-6 h-6 cursor-pointer" />
                </div>
              </div>
              <div className="font-medium">
                <span className="text-[16px]">{item.documentCategory}</span>
                <div className="text-[14px] text-secondary-foreground flex justify-between items-center">
                  <span className="">{item.numOfDocs} documents</span>
                  <span className="font-normal ">
                    Created {item.createdDate}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </HRCard>
    </div>
  );
};
