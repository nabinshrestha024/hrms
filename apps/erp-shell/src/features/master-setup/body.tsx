import { CustomAlert, HRCard } from '@erp/ui';
import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

interface BodyProps {
  component: ReactNode;
}

export const MasterSetupBody = ({ component }: BodyProps) => {
  return (
    <>
      <div className="px-6 pt-0 pb-32.5">
        <HRCard
          cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
          cardContentClassName="p-0 flex flex-col gap-8"
        >
          {component}
          <CustomAlert
            icon={<Info className="text-[24px] text-muted-foreground" />}
            title="Administration Tip:"
            titleClassName="text-[12px] leading-4 text-foreground font-medium"
            description="These categories define the baseline for employee profiles and payroll calculations. Modifying Job Levels or Currencies may affect existing records."
          />
        </HRCard>
      </div>
    </>
  );
};
