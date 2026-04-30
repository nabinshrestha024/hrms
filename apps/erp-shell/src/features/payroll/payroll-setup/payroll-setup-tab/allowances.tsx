import { CustomAlert } from '@erp/ui';
import { Info } from 'lucide-react';
import { AllowanceCard } from './allowance/allowance-card';
import { ConfiguredAllowance } from './allowance/configured-allowance';

export const Allowance = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-120 h-full overflow-auto flex flex-col gap-8">
        <CustomAlert
          title="Allowances & Tax Treatment"
          description="Configure allowances as taxable, non-taxable, or partially taxable based on Nepal tax law. Non-taxable allowances have exemption limits as per income tax rules."
          icon={<Info className="w-4 h-4" />}
        />
        <AllowanceCard />
        <ConfiguredAllowance />
      </div>
    </div>
  );
};
