import { Form, HRCard, toast, useDialogClose } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  SalaryStructureTemplateFormValue,
  salaryStructureTemplateSchema,
} from '../zod/SalaryStructure.zod';
import { AllowanceCard } from './form/allowance';
import { BasicSalaryCard } from './form/basic-salary';
import { SalaryPreview } from './form/salary-preview';
import { StatutaryDeductionCard } from './form/statutary-deductions';

export const SalaryStructureForm = () => {
  const form = useForm<SalaryStructureTemplateFormValue>({
    resolver: zodResolver(salaryStructureTemplateSchema),
    mode: 'onChange',
  });

  const close = useDialogClose();

  const onsubmit = (data: SalaryStructureTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    close();
    toast({ title: 'Salary structure', variant: 'success' });
  };

  return (
    <FormProvider {...form}>
      <Form form={form} onSubmit={onsubmit}>
        <HRCard
          cardClassName="max-h-[600px] overflow-auto p-0 border-none rounded-none shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <SalaryPreview />
          <BasicSalaryCard />
          <AllowanceCard />
          <StatutaryDeductionCard />
        </HRCard>
      </Form>
    </FormProvider>
  );
};
