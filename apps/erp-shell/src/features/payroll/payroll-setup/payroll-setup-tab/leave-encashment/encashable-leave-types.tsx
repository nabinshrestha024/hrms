import { CheckboxGroup, HRCard } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { LeaveEncashmentTemplateFormValue } from '../../../zod/LeaveEncashment.zod';

export const EncashmentLeaveType = () => {
  const { control } = useFormContext<LeaveEncashmentTemplateFormValue>();

  return (
    <HRCard
      cardContentClassName="p-0 flex flex-col gap-6 "
      cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
    >
      <span className="text-[14px] font-medium leading-5 text-foreground">
        Encashable Leave Types
      </span>
      <Controller
        control={control}
        name="encashableLeaveTypes"
        render={({ field }) => (
          <CheckboxGroup
            options={[
              { value: 'Annual Leave', label: 'Annual Leave' },
              { value: 'Sick Leave', label: 'Sick Leave' },
              { value: 'Casual Leave', label: 'Casual Leave' },
              { value: 'Earned Leave', label: 'Earned Leave' },
              { value: 'Home Leave', label: 'Home Leave' },
            ]}
            value={field.value || []}
            onValueChange={field.onChange}
            optionClassName="px-3 py-2.5  flex justify-between rounded-[6px] items-center"
            className="grid grid-cols-5 gap-4"
            checkboxClassName="data-[state=checked]:bg-[#e0e7ff] data-[state=checked]:text-primary"
          />
        )}
      />
    </HRCard>
  );
};
