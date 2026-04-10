import { Button, HRCard } from '@erp/ui';
import { Download } from 'lucide-react';

export const FileView = () => {
  return (
    <>
      <HRCard
        cardClassName="py-6 px-0 border border-border shadow-none rounded-[6px] bg-background"
        cardContentClassName="p-0 flex flex-col gap-2 items-center"
      >
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-chart-1 ">
          <Download className="w-6 h-6 text-primary " />
        </div>
        <div className="text-[12px] leading-5 font-normal flex gap-1">
          Employee Contract
        </div>

        <div className="text-secondary-foreground text-[14px] font-normal">
          This is an uploaded file
        </div>
        <Button
          type="button"
          variant="secondary"
          className="rounded-xl text-[14px] font-medium text-white"
        >
          Download Original File
        </Button>
      </HRCard>
    </>
  );
};
