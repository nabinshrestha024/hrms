import { Plus } from 'lucide-react';
import { IconButton } from '../../../components/icon-button';

export const CreateTemplateField = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-4 border-2 border-dashed border-muted-foreground p-4 cursor-pointer"
    >
      <IconButton variant="primary" className="p-3 bg-[#C6D2FF] w-12 h-12">
        <Plus className="w-8 h-8 text-indigo-600" />
      </IconButton>

      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-medium">Create Template</span>
        <span className="text-[14px]">Build a policy directly in browser</span>
      </div>
    </div>
  );
};
