import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Form, HRCard, HRCombobox, HRInput, useDialogFormStore } from '@erp/ui';
import { EducationFormValue, educationSchema } from './AddEducationZod';

export const AddEducationForm = () => {
  const form = useForm<EducationFormValue>({
    resolver: zodResolver(educationSchema),
    mode: 'onChange',
    defaultValues: {
      status: '',
    },
  });
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const closeDialog = useDialogFormStore((state) => state.onClose);
  const onsubmit = (data: EducationFormValue) => {
    console.warn('Save Changes: ', data);
    closeDialog();
  };

  const statusData = [
    {
      id: 0,
      content: 'Completed',
      value: 'Completed',
    },
    {
      id: 1,
      content: 'InCompleted',

      value: 'InCompleted',
    },
    {
      id: 2,
      content: 'In Progress',
      value: 'In Progress',
    },
  ];

  return (
    <div className="relative w-full flex flex-col gap-4">
      <Form form={form} onSubmit={onsubmit}>
        <HRCard
          cardClassName="shadow-none rounded-none border-none p-0 "
          cardContentClassName="flex flex-col gap-4 p-0"
        >
          <HRInput
            Label="Degree/Qualification"
            isRequired
            type="text"
            placeholder="e.g. Bachelor of Science"
            inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
            error={errors.qualification?.message}
            {...register('qualification')}
          />

          <HRInput
            Label="Field of Study"
            isRequired
            type="text"
            placeholder="e.g. Computer Science"
            inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
            error={errors.studyField?.message}
            {...register('studyField')}
          />

          <HRInput
            Label="Institution/University"
            isRequired
            type="text"
            placeholder="e.g. Global College"
            inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
            error={errors.university?.message}
            {...register('university')}
          />
          <div className="grid grid-cols-2 gap-4">
            <HRInput
              Label="Start Year"
              type="text"
              placeholder="e.g 2016"
              inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
              {...register('startYear')}
            />

            <HRInput
              Label="End Year"
              type="text"
              placeholder="e.g 2020"
              inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
              {...register('endYear')}
            />
          </div>

          <HRInput
            Label="Grade/GPA"
            type="text"
            placeholder="e.g. 3.8"
            inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
            {...register('grade')}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <HRCombobox
                Label="Status"
                selectData={statusData}
                inputClassName="py-[10px] rounded-[6px] border border-[#E4E4E7]"
                placeholder="State"
                value={field.value || ''}
                onValueChange={(val) => field.onChange(val)}
                disabled={false}
              />
            )}
          />
        </HRCard>
      </Form>
    </div>
  );
};
