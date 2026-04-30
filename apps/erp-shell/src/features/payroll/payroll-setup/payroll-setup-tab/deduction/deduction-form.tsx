import { HRCard, Switch, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { ProvidentFund } from './provident-fund';
import {
  DeductionTemplateFormValue,
  deductionTemplateSchema,
} from '../../../zod/Deduction.zod';
import { SocialSecurityFund } from './social-security-fund';
import { InsuranceDeductions } from './insurance-deductions';
import { Gratuity } from './gratuity';

export const DeductionForm = () => {
  const form = useForm<DeductionTemplateFormValue>({
    resolver: zodResolver(deductionTemplateSchema),
    mode: 'onChange',
  });
  const { control } = form;

  const onsubmit = (data: DeductionTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    toast({ title: 'Deduction added', variant: 'success' });
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form id="deduction-form" onSubmit={form.handleSubmit(onsubmit)}>
        <HRCard
          cardClassName="p-0 border-none rounded-none shadow-none"
          cardContentClassName="p-0 flex flex-col gap-8"
        >
          <ProvidentFund />
          <SocialSecurityFund />
          <HRCard
            cardContentClassName="p-0 flex flex-col gap-3 "
            cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-medium leading-5 text-foreground">
                  Citizen Investment Trust (CIT)
                </span>
                <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
                  Optional tax-saving investment scheme
                </span>
              </div>

              <Controller
                control={control}
                name="cit"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </HRCard>

          <InsuranceDeductions />
          <Gratuity />
        </HRCard>
      </form>
    </FormProvider>
  );
};
