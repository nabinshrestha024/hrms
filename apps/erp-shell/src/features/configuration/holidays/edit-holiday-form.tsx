import { Holiday, useCreateHoliday, useUpdateHoliday } from '@erp/data-access';
import {
  Form,
  HRCard,
  HRDateField,
  HRInput,
  HRSelect,
  HRTextarea,
  toast,
  useDialogClose,
} from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  ConfigHolidayTemplateFormValue,
  configHolidayTemplateSchema,
} from '../zod/ConfigHoliday.Zod';

interface EditConfigHolidayFormProps {
  selectedHoliday?: Holiday;
}
export const EditConfigHolidayForm = ({
  selectedHoliday,
}: EditConfigHolidayFormProps) => {
  const form = useForm<ConfigHolidayTemplateFormValue>({
    resolver: zodResolver(configHolidayTemplateSchema),
    mode: 'onChange',
    defaultValues: {
      holidayName: selectedHoliday?.name,
      date: selectedHoliday?.date ? new Date(selectedHoliday.date) : undefined,
      holidayType: selectedHoliday?.type,
      description: selectedHoliday?.description,
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const close = useDialogClose();
  const updateHoliday = useUpdateHoliday(selectedHoliday?.id || '');

  const onsubmit = (data: ConfigHolidayTemplateFormValue) => {
    updateHoliday.mutate(
      {
        name: data.holidayName,
        date: data.date.toISOString().split('T')[0],
        type: data.holidayType,
        description: data.description,
      },
      {
        onSuccess: () => {
          toast({ title: 'Holiday Edited', variant: 'success' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to edit holiday' });
        },
      }
    );
  };
  const holidayTypeOption = [
    {
      id: 1,
      value: 'National Holiday',
      content: 'National Holiday',
      color: '#51A2FF',
    },
    {
      id: 2,
      value: 'Regional Holiday',
      content: 'Regional Holiday',
      color: '#05DF72',
    },
    {
      id: 3,
      value: 'Company Holiday',
      content: 'Company Holiday',
      color: '#C27AFF',
    },
    {
      id: 4,
      value: 'Optional Holiday',
      content: 'Optional Holiday',
      color: '#FF8904',
    },
  ];
  return (
    <Form onSubmit={onsubmit} form={form}>
      <HRCard
        cardClassName="p-0 border-none rounded-none shadow-none"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4  ">
          <HRInput
            Label="Leave Name"
            isRequired
            type="text"
            placeholder="e.g. Annual Leave"
            error={errors.holidayName?.message as string}
            {...register('holidayName')}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <HRDateField
                Label="Start Date"
                isRequired
                placeholder="2026-03-10"
                className="py-2.5 rounded-[6px] border border-border"
                error={errors.date?.message as string}
                date={field.value}
                onDateChange={field.onChange}
              />
            )}
          />

          <Controller
            name="holidayType"
            control={control}
            render={({ field }) => (
              <HRSelect
                Label="Holiday Type"
                isRequired
                selectData={holidayTypeOption}
                placeholder="Select Holiday Type"
                value={field.value}
                onValueChange={field.onChange}
                error={errors.holidayType?.message}
              />
            )}
          />
          <HRTextarea
            Label="Brief Description (Optional)"
            placeholder="Type Here..."
            subLabel="Less than 200 words"
            error={errors.description?.message as string}
            {...register('description')}
          />
        </div>
      </HRCard>
    </Form>
  );
};
