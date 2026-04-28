import { Button, CustomAlert } from '@erp/ui';
import { Info } from 'lucide-react';
import { TaxSlabForm } from './tax-slabs/tax-slabs-form';
//
export const TaxSlabs = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-115 overflow-auto flex flex-col gap-8">
        <CustomAlert
          title="Nepal Income Tax Policy (FY 2080/81)"
          description="Tax rates are based on the Income Tax Act of Nepal. Single and married individuals have different tax brackets. 10% additional rebate is available for female taxprayers."
          icon={<Info className="w-4 h-4" />}
        />
        <TaxSlabForm />
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
          form="tax-slabs-form"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
