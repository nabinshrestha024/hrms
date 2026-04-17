import { Dot, Edit, File, Trash2 } from 'lucide-react';
import { HRCard } from '@erp/ui';
import { DocumnetTemplateType } from '../schema/DocumentTemplateData';

export const DocumentTemplateCard = ({
  data,
}: {
  data: DocumnetTemplateType[];
}) => {
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
                <span className="text-[16px]">{item.documentName}</span>
                <div className="text-[14px] text-secondary-foreground font-medium flex items-center">
                  <span>Category Name</span>
                  <Dot className="w-4 h-4 text-foreground" />
                  <span>{item.fileName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </HRCard>
    </div>
  );
};
