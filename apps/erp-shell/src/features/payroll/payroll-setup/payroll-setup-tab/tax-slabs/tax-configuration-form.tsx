import { HRAccordionCard, HRCard, HRSelect } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { TaxSlabTemplateFormValue } from '../../../zod/TaxSlabs.zod';
import { TaxConfigurationTable } from './table/tax-configuration-table';
import { TaxConfigSecondPartForm } from './tax-config-second-part-form';
import { useState } from 'react';
import { TaxConfigurationType } from '../../../schema/TaxSlabsData';
export const TaxConfiguration = () => {
  const { control } = useFormContext<TaxSlabTemplateFormValue>();
  const [records] = useState<TaxConfigurationType[]>(() => {
    const stored = sessionStorage.getItem('taxConfigData');
    return stored ? JSON.parse(stored) : [];
  });

  console.warn('Records:', records);
  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none"
      cardContentClassName="p-0 "
    >
      <HRAccordionCard value="tax-configuration" title="Tax Configuration ">
        <HRCard
          cardClassName="mt-6 p-0 border-none rounded-[6px] bg-white shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="fiscalYear"
              control={control}
              render={({ field }) => (
                <HRSelect
                  selectData={[]}
                  placeholder="2080/81"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <HRSelect
                  selectData={[]}
                  placeholder="Single"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[16px] text-foreground font-medium leading-6">
              Tax Configuration
            </span>
            <TaxConfigurationTable data={records} />
            <TaxConfigSecondPartForm />
          </div>
        </HRCard>
      </HRAccordionCard>
    </HRCard>
  );
};
