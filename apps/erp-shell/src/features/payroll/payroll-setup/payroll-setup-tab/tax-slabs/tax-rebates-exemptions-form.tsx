import { HRAccordionCard, HRCard, Switch } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { TaxSlabTemplateFormValue } from '../../../zod/TaxSlabs.zod';
import { Percent } from 'lucide-react';
export const TaxRebatesExemption = () => {
  const { control } = useFormContext<TaxSlabTemplateFormValue>();

  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none"
      cardContentClassName="p-0 "
    >
      <HRAccordionCard
        value="tax-rebates-exemptions"
        title="Tax Rebates & Exemptions"
      >
        <HRCard
          cardClassName="mt-6 p-0 border-none rounded-[6px] bg-white shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <HRCard
            cardClassName=" px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
            cardContentClassName="p-0 flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span>Female Taxpayer Rebate</span>
              <span>10% rebate on calculated tax for female employees</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-3 items-center border border-border rounded-lg px-3 py-2.5">
                <span>10 </span>
                <Percent className="w-4 h-4 text-secondary-foreground" />
              </div>
              <Controller
                control={control}
                name="femaleTaxpayerRebate"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </HRCard>
          <HRCard
            cardClassName=" p-0 px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
            cardContentClassName="p-0 flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span>Social Security Fund Rebate</span>
              <span>SSF contribution is deductible from taxable income</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex gap-3 items-center border border-border rounded-lg px-3 py-2.5">
                <span>100 </span>
                <Percent className="w-4 h-4 text-secondary-foreground" />
              </div>
              <Controller
                control={control}
                name="socialSecurityFundRebate"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </HRCard>
          <HRCard
            cardClassName=" p-0 px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
            cardContentClassName="p-0 flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span>Life Insurance Premium Rebate</span>
              <span>Deduction on life insurance premium (up to limit)</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>Max Rs.</span>
              <div className="flex justify-between border border-border rounded-lg px-3 py-2.5">
                <span>4000 </span>{' '}
              </div>
              <Controller
                control={control}
                name="lifeInsurancePremiumRebate"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </HRCard>
          <HRCard
            cardClassName=" p-0 px-3 py-2.5 border border-border rounded-[6px] bg-white shadow-none"
            cardContentClassName="p-0 flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span>Medical Insurance Rebate</span>
              <span>Deduction on medical insurance premium</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>Max Rs.</span>
              <div className="flex justify-between border border-border rounded-lg px-3 py-2.5">
                <span>200000 </span>{' '}
              </div>
              <Controller
                control={control}
                name="medicalInsuranceRebate"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </HRCard>
        </HRCard>
      </HRAccordionCard>
    </HRCard>
  );
};
