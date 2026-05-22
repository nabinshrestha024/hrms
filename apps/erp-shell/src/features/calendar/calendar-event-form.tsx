import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  AddCalendarEventFormValue,
  addCalendarEventSchema,
} from './zod/CalendarEventForm.zod';
import {
  Form,
  HRInput,
  HRLabel,
  HRSelect,
  HRTextarea,
  OptionRadioGroup,
  useDialogClose,
} from '@erp/ui';

interface Props {
  selectedDate: string;
  onSave: (event: any) => void;
}

export const AddCalendarEventForm = ({ selectedDate, onSave }: Props) => {
  const form = useForm<AddCalendarEventFormValue>({
    resolver: zodResolver(addCalendarEventSchema),
    mode: 'onChange',
    defaultValues: {
      eventType: 'Holiday',
    },
  });

  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = form;

  const [text, setText] = useState('');
  const eventType = watch('eventType');

  const closeDialog = useDialogClose();

  const durationOptions = [
    { id: 0, content: 'Full', value: 'Full' },
    { id: 1, content: 'First Half', value: 'First Half' },
    { id: 2, content: 'Second Half', value: 'Second Half' },
  ];

  const eventOptions = [
    { id: 0, label: 'Holiday', value: 'Holiday' },
    { id: 1, label: 'Event', value: 'Event' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const words = newText.trim().split(/\s+/);

    if (words.length <= 100) {
      setText(newText);
      setValue('description', newText, { shouldValidate: true });
    }
  };

  const onsubmit = (data: AddCalendarEventFormValue) => {
    const newEvent = {
      title: data.eventType === 'Holiday' ? data.holidayName : data.eventName,
      start: selectedDate,
      backgroundColor: data.eventType === 'Holiday' ? '#fabfbf' : '#bfcefa',
      // display: 'background',
    };
    onSave(newEvent);
    closeDialog();
    console.warn('Form Data:', data);
  };

  return (
    <div className="w-full flex flex-col gap-4 max-h-134.5 overflow-auto overflow-x-hidden pr-2">
      <Form form={form} onSubmit={onsubmit}>
        <div className="flex flex-col gap-4">
          <span className="text-[12px] text-secondary-foreground font-medium leading-4">
            {selectedDate}
          </span>

          <div className="flex flex-col gap-3">
            <HRLabel labelClassName="text-[14px] font-medium leading-5 text-[#18181B]">
              Event Type
            </HRLabel>
            <Controller
              control={control}
              name="eventType"
              render={({ field }) => (
                <OptionRadioGroup
                  options={eventOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex items-center gap-3"
                  optionClassName="px-3 py-2.5"
                  itemClassName="border-[#A1A1AA] shadow-none"
                  error={errors.eventType?.message}
                />
              )}
            />
          </div>

          {eventType === 'Holiday' && (
            <>
              <HRInput
                Label="Holiday Name"
                placeholder="e.g. New Year's Day"
                {...register('holidayName')}
                error={errors.holidayName?.message}
                inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
              />

              <Controller
                name="holidayType"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Holiday Type"
                    isRequired={true}
                    triggerClassName="w-full px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
                    selectData={durationOptions}
                    placeholder="Select Holiday Type"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.holidayType?.message}
                  />
                )}
              />
            </>
          )}

          {eventType === 'Event' && (
            <HRInput
              Label="Event Name"
              placeholder="e.g. Company Meeting"
              {...register('eventName')}
              error={errors.eventName?.message}
              inputClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
            />
          )}

          <HRTextarea
            Label="Description"
            isRequired={true}
            placeholder="Explain the reason"
            textAreaClassName="px-3 py-[10px] rounded-[6px] border border-[#E4E4E7]"
            value={text}
            onChange={handleChange}
            error={errors.description?.message}
          />
        </div>
      </Form>
    </div>
  );
};
