import { Button, CustomAlert } from '@erp/ui';
import { Info } from 'lucide-react';
import { DeductionForm } from './deduction/deduction-form';

export const Deductions = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-115 h-full overflow-auto flex flex-col gap-8">
        <CustomAlert
          title="Nepal Statutory Deductions"
          description="SSF: 11% employee + 20% employer contribution. PF: 10% employee + 10% employer. CIT: Optional savings scheme with tax benefits."
          icon={<Info className="w-4 h-4" />}
        />
        <DeductionForm />
      </div>
      <div className="sticky bottom-0 z-10 bg-white p-6 rounded-b-xl border-t border-border flex justify-end gap-6">
        <Button
          type="button"
          variant="outline"
          className="text-[14px] font-medium leading-5 text-muted-foreground "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="flex gap-2  text-[14px] font-medium leading-5 text-white items-center"
          form="deduction-form"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
