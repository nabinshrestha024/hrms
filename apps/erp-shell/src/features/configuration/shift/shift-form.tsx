import {
  Form,
  HRCard,
  HRInput,
  HRLabel,
  HRSelect,
  HRTimeField,
  OptionCheckboxGroup,
  Switch,
  toast,
  useDialogClose,
} from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import {
  ShiftTemplateFormValue,
  shiftTemplateSchema,
} from '../zod/ShiftForm.Zod';

export const ShiftForm = () => {
  const form = useForm<ShiftTemplateFormValue>({
    resolver: zodResolver(shiftTemplateSchema),
    mode: 'onChange',
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const close = useDialogClose();
  const onsubmit = (data: ShiftTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    close();
    toast({ title: 'Shift Added', variant: 'success' });
  };
  const timeOption = [
    {
      id: 1,
      value: 'Morning ',
      content: 'Morning ',
      icon: Sunrise,
    },
    {
      id: 2,
      value: 'Day ',
      content: 'Day ',
      icon: Sun,
    },
    {
      id: 3,
      value: 'Evening ',
      content: 'Evening ',
      icon: Sunset,
    },
    {
      id: 4,
      value: 'Night ',
      content: 'Night ',
      icon: Moon,
    },
  ];
  return (
    <Form form={form} onSubmit={onsubmit}>
      <HRCard
        cardClassName="max-h-161 overflow-auto p-0 border-none rounded-none bg-white shadow-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <HRInput
            Label="Shift"
            isRequired
            type="text"
            placeholder="e.g. Morning Shift"
            error={errors.shift?.message as string}
            {...register('shift')}
          />
          <HRInput
            Label="Code"
            isRequired
            type="text"
            placeholder="e.g. MS"
            error={errors.code?.message as string}
            {...register('code')}
          />
        </div>
        <Controller
          name="shiftType"
          control={control}
          render={({ field }) => (
            <HRSelect
              Label="Shift Type"
              isRequired
              selectData={timeOption}
              placeholder="Select Shift Type"
              value={field.value}
              onValueChange={field.onChange}
              error={errors.shiftType?.message}
            />
          )}
        />
        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <HRTimeField
                Label="Start Time"
                isRequired
                placeholder="9:00 AM"
                className="py-2.5 rounded-[6px] border border-[#E4E4E7]"
                error={errors.startTime?.message as string}
                time={field.value}
                onTimeChange={field.onChange}
              />
            )}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <HRTimeField
                Label="End Time"
                isRequired
                placeholder="6:00 PM"
                className="py-2.5 rounded-[6px] border border-[#E4E4E7]"
                error={errors.endTime?.message as string}
                time={field.value}
                onTimeChange={field.onChange}
              />
            )}
          />
          <HRInput
            Label="Break (minutes)"
            isRequired
            type="text"
            placeholder="60"
            error={errors.break?.message as string}
            {...register('break')}
          />
        </div>
        <div className="px-3 py-2.5 bg-muted rounded-[6px] flex gap-2 items-center">
          <span className="text-[12px] text-foreground font-normal leading-4">
            Working Hours:
          </span>
          <span className="text-[14px] text-foreground font-medium leading-5">
            8 hours
          </span>
        </div>
        <Controller
          control={control}
          name="applicableDays"
          render={({ field }) => (
            <OptionCheckboxGroup
              Label="Applicable Days"
              options={[
                { value: 'mon', label: 'Mon' },
                { value: 'tue', label: 'Tues' },
                { value: 'wed', label: 'Wed' },
                { value: 'thu', label: 'Thu' },
                { value: 'fri', label: 'Fri' },
                { value: 'sat', label: 'Sat' },
                { value: 'sun', label: 'Sun' },
              ]}
              value={field.value || []}
              onValueChange={field.onChange}
            />
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <HRInput
            Label="Grace Period (minutes)"
            isRequired
            type="text"
            placeholder="15"
            error={errors.grace?.message as string}
            {...register('grace')}
          />
          <HRInput
            Label="Overtime After (hours)"
            isRequired
            type="text"
            placeholder="9"
            error={errors.overTime?.message as string}
            {...register('overTime')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <HRInput
            Label="Late In (minutes)"
            isRequired
            type="text"
            placeholder="15"
            error={errors.lateIn?.message as string}
            {...register('lateIn')}
          />
          <HRInput
            Label="Early Out (minutes)"
            isRequired
            type="text"
            placeholder="9"
            error={errors.earlyOut?.message as string}
            {...register('earlyOut')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2.5 border border-border rounded-[6px] bg-white flex justify-between items-center">
            <HRLabel labelClassName="flex flex-col gap-1">
              <span>Set as Default Shift</span>
              <span className="text-[14px] text-secondary-foreground font-medium leading-5">
                New employees will be assigned this shift
              </span>
            </HRLabel>

            <Controller
              control={control}
              name="defaultShift"
              render={({ field }) => (
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {errors.defaultShift && (
            <span className="text-red-500 text-[12px]">
              {errors.defaultShift.message}
            </span>
          )}
        </div>
      </HRCard>
    </Form>
  );
};
