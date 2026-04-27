import { type DocumentCategory } from '@erp/data-access';
import { HRCard } from '@erp/ui';
import { Edit, File, Trash2 } from 'lucide-react';

/**
 * Format an ISO timestamp as a short YYYY-MM-DD date for display.
 * Defensive against malformed input.
 */
function formatCreatedDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toISOString().slice(0, 10);
}

export const CategoryManagementCard = ({
  data,
}: {
  data: DocumentCategory[];
}) => {
  return (
    <div className="px-6">
      <HRCard
        cardClassName="border-none shadow-none rounded-xl bg-white p-6"
        cardContentClassName="p-0 grid grid-cols-3 gap-6"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 shadow-sm border border-border rounded-xl p-4"
          >
            <div className="flex">
              <File className="text-primary bg-[#F3F3FE] rounded-xl p-3 w-10 h-10 cursor-pointer" />
              <div className="flex gap-3 ml-auto">
                <Edit className="bg-muted rounded-lg p-1 w-6 h-6 cursor-pointer" />
                <Trash2 className="bg-chart-3 text-[#E7000B] rounded-lg p-1 w-6 h-6 cursor-pointer" />
              </div>
            </div>
            <div className="font-medium">
              <span className="text-[16px]">{item.name}</span>
              <div className="text-[14px] text-secondary-foreground flex justify-between items-center">
                <span>{item.documentCount} documents</span>
                <span className="font-normal">
                  Created {formatCreatedDate(item.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </HRCard>
    </div>
  );
};
