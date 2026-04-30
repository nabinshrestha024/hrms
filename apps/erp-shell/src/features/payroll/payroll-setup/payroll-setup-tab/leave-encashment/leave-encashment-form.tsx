import { HRCard, toast } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  LeaveEncashmentTemplateFormValue,
  leaveEncashmentTemplateSchema,
} from '../../../zod/LeaveEncashment.zod';
import { LeaveEncashmentSetting } from './leave-encashment-settings';
import { EncashmentTiming } from './encashment-timing-rules';

export const LeaveEncashmentForm = () => {
  const form = useForm<LeaveEncashmentTemplateFormValue>({
    resolver: zodResolver(leaveEncashmentTemplateSchema),
    mode: 'onChange',
  });

  const {
    formState: { errors },
  } = form;
  console.warn('Error of Leave Encashment: ', errors);

  const onsubmit = (data: LeaveEncashmentTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    toast({ title: 'Leave Encashment added', variant: 'success' });
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form id="leave-encashment-form" onSubmit={form.handleSubmit(onsubmit)}>
        <HRCard
          cardClassName="p-0 border-none rounded-none shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <LeaveEncashmentSetting />
          <EncashmentTiming />
        </HRCard>
      </form>
    </FormProvider>
  );
};
