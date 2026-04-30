import { HRCard, OptionRadioGroup, Switch } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { FestivalBonusTemplateFormValue } from '../../../zod/FestivalBonus.zod';
import { taxDistributionOptions } from '../../../schema/FestivalBonusData';
import { Calendar } from 'lucide-react';

export const TaxDistributionMethod = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FestivalBonusTemplateFormValue>();

  return (
    <HRCard
      cardContentClassName="p-0 flex flex-col gap-6 "
      cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
    >
      <span className="text-[14px] font-medium leading-5 text-foreground">
        Tax Distribution Method
      </span>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="taxDistributionMethod"
          render={({ field }) => (
            <OptionRadioGroup
              options={taxDistributionOptions}
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-col gap-3"
              optionClassName="border border-border rounded-[6px] px-3 py-2.5 items-start gap-4"
              itemClassName="border-muted-foreground shadow-none"
              error={errors.taxDistributionMethod?.message}
            />
          )}
        />
        <HRCard
          cardContentClassName="p-0 flex gap-2 items-center"
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-muted"
        >
          <Calendar className="w-4 h-4 text-secondary-foreground" />
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Monthly Tax Calculation Example
            </span>
            <span className="text-[12px] font-normal leading-4 text-foreground">
              If bonus is Rs. 60,000/year, Rs. 5,000 is added to each month's
              taxable income for tax calculation. The actual bonus is still paid
              in Ashwin.
            </span>
          </div>
        </HRCard>
        <HRCard
          cardContentClassName="p-0 flex justify-between items-center "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Include Bonus in Annual Tax Calculation
            </span>
            <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
              Consider festival bonus when calculating annual tax liability
            </span>
          </div>
          <Controller
            control={control}
            name="annualTaxCalculation"
            render={({ field }) => (
              <Switch
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </HRCard>
        <HRCard
          cardContentClassName="p-0 flex justify-between items-center "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Bonus is Taxable Income
            </span>
            <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
              Festival bonus is added to taxable income as per Nepal tax law
            </span>
          </div>
          <Controller
            control={control}
            name="taxableIncome"
            render={({ field }) => (
              <Switch
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </HRCard>
      </div>
    </HRCard>
  );
};
