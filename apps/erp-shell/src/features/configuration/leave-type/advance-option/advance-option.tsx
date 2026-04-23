import { CustomAlert } from '@erp/ui';
import { Info } from 'lucide-react';
import { AdvanceOptionForm } from './advance-option-form';

export const AdvanceOption = () => {
  return (
    <div className="flex flex-col gap-3">
      <CustomAlert
        icon={<Info className="text-[24px] text-[#A1A1AA]" />}
        description={
          <div className="flex flex-col gap-1">
            <span>
              Default advanced options are suggested to your based on industry
              best practices.
            </span>
            <span>You do not need change these in the normal case.</span>
          </div>
        }
      />
      <AdvanceOptionForm />
    </div>
  );
};
