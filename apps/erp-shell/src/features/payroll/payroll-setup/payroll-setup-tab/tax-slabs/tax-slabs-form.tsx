import { HRCard, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TaxSlabTemplateFormValue,
  taxSlabTemplateSchema,
} from '../../../zod/TaxSlabs.zod';
import { TaxRebatesExemption } from './tax-rebates-exemptions-form';
import { TaxConfiguration } from './tax-configuration-form';

export const TaxSlabForm = () => {
  const form = useForm<TaxSlabTemplateFormValue>({
    resolver: zodResolver(taxSlabTemplateSchema),
    mode: 'onChange',
    defaultValues: {
      config: [
        {
          minAmount: '',
          maxAmount: '',
          rate: '',
          description: '',
        },
      ],
    },
  });

  const onsubmit = (data: TaxSlabTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    toast({ title: 'Tax slabs added', variant: 'success' });
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form id="tax-slabs-form" onSubmit={form.handleSubmit(onsubmit)}>
        <HRCard
          cardClassName="p-0 border-none rounded-none shadow-none"
          cardContentClassName="p-0 flex flex-col gap-8"
        >
          <TaxConfiguration />
          <TaxRebatesExemption />
        </HRCard>
      </form>
    </FormProvider>
  );
};
