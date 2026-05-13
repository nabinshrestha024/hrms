import { type DocumentTemplate } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { Dot, Edit, File, Trash2 } from 'lucide-react';
import { IconButton } from '../../../components/icon-button';

const KIND_LABEL: Record<DocumentTemplate['kind'], string> = {
  file: 'File',
  template: 'Template',
};

interface DocumentTemplateProps {
  data: DocumentTemplate[];
  onEdit?: (documentTemplate: DocumentTemplate) => void;
  onDelete?: (id: string) => void;
}
export const DocumentTemplateCard = ({
  data,
  onDelete,
  onEdit,
}: DocumentTemplateProps) => {
  return (
    <div className="px-3 xl:px-6">
      <HRCard
        cardClassName="border-none shadow-none rounded-xl bg-white p-3 xl:p-6"
        cardContentClassName="p-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 shadow-sm border border-border rounded-xl p-4"
          >
            <div className="flex justify-between">
              <File className="text-primary bg-chart-7 rounded-xl p-3 w-10 h-10 cursor-pointer" />
              <div className="flex gap-3">
                <IconButton
                  type="button"
                  variant="default"
                  aria-label="Edit branch"
                  className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted p-1 cursor-pointer hover:bg-muted/80"
                  onClick={() => onEdit?.(item)}
                  tooltip="Edit"
                >
                  <Edit className="w-4 h-4 text-black font-bold" />
                </IconButton>
                <IconButton
                  type="button"
                  variant="destructive"
                  aria-label="Delete branch"
                  className="w-6 h-6 flex items-center justify-center rounded-sm bg-chart-3 p-1 cursor-pointer hover:bg-chart-3/80"
                  onClick={() => onDelete?.(item.id)}
                  tooltip="Delete"
                >
                  <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
                </IconButton>
              </div>
            </div>
            <div className="font-medium">
              <span className="text-[16px]">{item.name}</span>
              <div className="text-[14px] text-secondary-foreground font-medium flex items-center">
                <span>{item.categroy}</span>
                <Dot className="w-4 h-4 text-foreground" />
                <span>{KIND_LABEL[item.kind]}</span>
              </div>
            </div>
          </div>
        ))}
      </HRCard>
    </div>
  );
};
