import { HRCard, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FestivalBonusTemplateFormValue,
  festivalBonusTemplateSchema,
} from '../../../zod/FestivalBonus.zod';
import { FestivalBonusSetting } from './festival-bonus-setting';
import { TaxDistributionMethod } from './tax-distribution-method';

export const FestivalBonusForm = () => {
  const form = useForm<FestivalBonusTemplateFormValue>({
    resolver: zodResolver(festivalBonusTemplateSchema),
    mode: 'onChange',
  });

  const {
    formState: { errors },
  } = form;
  console.warn('Error of festival bonus: ', errors);

  const onsubmit = (data: FestivalBonusTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    toast({ title: 'Festival Bonus added', variant: 'success' });
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form id="festival-bonus-form" onSubmit={form.handleSubmit(onsubmit)}>
        <HRCard
          cardClassName="p-0 border-none rounded-none shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <FestivalBonusSetting />
          <TaxDistributionMethod />
        </HRCard>
      </form>
    </FormProvider>
  );
};
