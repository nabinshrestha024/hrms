import { HRCard } from '@erp/ui';

export const TemplateView = () => {
  return (
    <>
      <HRCard
        cardClassName="px-3 py-2.5 border border-border shadow-none rounded-[6px] bg-white"
        cardContentClassName="p-0"
      >
        <div className="text-[14px] text-foreground leading-5 font-normal">
          Employee Attendance and Punctuality Policy
        </div>
      </HRCard>
    </>
  );
};
