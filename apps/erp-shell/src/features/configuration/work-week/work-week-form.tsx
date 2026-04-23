import {
  Button,
  HRCard,
  HRInput,
  HRSelect,
  OptionSwitchCheckboxGroup,
  Switch,
  toast,
} from '@erp/ui';
import { Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import {
  WorkWeekTemplateFormValue,
  workWeekTemplateSchema,
} from '../zod/WorkWeek.Zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  weekendPolicyOptions,
  weekStartsOptions,
} from '../schema/WorkWeekData';
import { useState } from 'react';

export const WorkWeekForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<WorkWeekTemplateFormValue>({
    resolver: zodResolver(workWeekTemplateSchema),
    mode: 'onChange',
  });

  console.warn(errors);
  const onsubmit = (data: WorkWeekTemplateFormValue) => {
    console.warn('Submitted Form Data: ', data);
    reset();
    toast({ title: 'Work Week added', variant: 'success' });
  };
  const [enabled, setEnabled] = useState(false);
  const workingDays = watch('workingDays') || [];
  const halfDayCount = workingDays.filter((d) => d.type === 'half').length;
  const payrollCycleStarts = watch('payrollCycleStarts');
  const payrollCycleEnds = watch('payrollCycleEnds');

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="px-6 ">
          <HRCard
            cardClassName="p-6 border-none rounded-t-xl bg-white shadow-[0_1px_2px_0_rgba(255,0,0,0.05)]"
            cardContentClassName="flex flex-col gap-6 p-0"
          >
            <div className="flex flex-col gap-4">
              <Controller
                name="weekStarts"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Week Starts On"
                    isRequired
                    triggerClassName="w-[347px] "
                    selectData={weekStartsOptions}
                    placeholder="Select week starts on"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    error={errors.weekStarts?.message}
                    disabled={false}
                  />
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <Controller
                  name="weekendPolicy"
                  control={control}
                  render={({ field }) => (
                    <HRSelect
                      Label="Weekend Policy"
                      isRequired
                      selectData={weekendPolicyOptions}
                      placeholder="Select weekend policy"
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      error={errors.weekendPolicy?.message}
                      disabled={false}
                    />
                  )}
                />
                <HRInput
                  Label="Payroll Cycle Starts"
                  isRequired={true}
                  type="text"
                  placeholder="1"
                  error={errors.payrollCycleStarts?.message}
                  {...register('payrollCycleStarts')}
                />

                <HRInput
                  Label="Payroll Cycle Ends"
                  type="text"
                  placeholder="3"
                  error={errors.payrollCycleEnds?.message}
                  {...register('payrollCycleEnds')}
                />
              </div>
            </div>
            <HRCard
              cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
              cardContentClassName="p-0 flex flex-col gap-6"
            >
              <div className="text-[16px] font-medium leaading-5 text-foreground">
                Working Days
              </div>
              <Controller
                control={control}
                name="workingDays"
                render={({ field }) => (
                  <OptionSwitchCheckboxGroup
                    options={[
                      { value: 'sun', label: 'Sun' },
                      { value: 'mon', label: 'Mon' },
                      { value: 'tue', label: 'Tues' },
                      { value: 'wed', label: 'Wed' },
                      { value: 'thu', label: 'Thu' },
                      { value: 'fri', label: 'Fri' },
                      { value: 'sat', label: 'Sat' },
                    ]}
                    value={field.value || []}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </HRCard>
            <div className="grid grid-cols-2 gap-6">
              <HRCard
                cardClassName="p-6 border border-border rounded-[6px] shadow-none"
                cardContentClassName="flex flex-col gap-3 p-0"
              >
                <div className="text-[16px] font-medium leaading-5 text-foreground">
                  Work Hours
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <HRInput
                    Label="Minimum Hours/ Day"
                    type="text"
                    placeholder="3"
                    error={errors.minHours?.message}
                    {...register('minHours')}
                  />
                  <HRInput
                    Label="Maximum Hours/ Day"
                    type="text"
                    placeholder="3"
                    error={errors.maxHours?.message}
                    {...register('maxHours')}
                  />
                </div>
              </HRCard>
              <HRCard
                cardClassName="relative p-6 border border-border rounded-[6px] shadow-none"
                cardContentClassName="flex flex-col gap-3 p-0"
              >
                <div className="text-[16px] font-medium leaading-5 text-foreground">
                  Overtime Settings
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <HRInput
                    Label="Regular OT"
                    labelClassName={`${
                      enabled === false && 'text-secondary-foreground'
                    }`}
                    type="text"
                    placeholder="3"
                    error={errors.regularOT?.message}
                    {...register('regularOT')}
                    disabled={enabled === false}
                  />
                  <HRInput
                    Label="Weekend OT"
                    type="text"
                    labelClassName={`${
                      enabled === false && 'text-secondary-foreground'
                    }`}
                    placeholder="3"
                    error={errors.weekendOT?.message}
                    {...register('weekendOT')}
                    disabled={enabled === false}
                  />
                  <HRInput
                    Label="Holiday OT"
                    type="text"
                    labelClassName={`${
                      enabled === false && 'text-secondary-foreground'
                    }`}
                    placeholder="3"
                    error={errors.holidayOT?.message}
                    {...register('holidayOT')}
                    disabled={enabled === false}
                  />
                </div>

                <Switch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="absolute top-3 right-5"
                />
              </HRCard>
            </div>
            <HRCard
              cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-muted"
              cardContentClassName="flex flex-col gap-3 p-0"
            >
              <div className="text-[16px] font-medium leaading-5 text-foreground">
                Summary
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leaading-5 text-secondary-foreground">
                    Working Days:
                  </span>
                  <span className="text-[14px] font-medium leaading-5 text-foreground">
                    {workingDays.length}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leaading-5 text-secondary-foreground">
                    Half Days:
                  </span>
                  <span className="text-[14px] font-medium leaading-5 text-foreground">
                    {halfDayCount}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leaading-5 text-secondary-foreground">
                    Payroll Cycle:
                  </span>
                  <span className="text-[14px] font-medium leaading-5 text-foreground">
                    {payrollCycleStarts} - {payrollCycleEnds}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium leaading-5 text-secondary-foreground">
                    FY Starts:
                  </span>
                  <span className="text-[14px] font-medium leaading-5 text-foreground">
                    {}
                  </span>
                </div>
              </div>
            </HRCard>
          </HRCard>
        </div>
        <div className="h-22 sticky bottom-5 top-0 z-10 bg-white  p-6 rounded-b-xl border-t border-[#E4E4E7] flex justify-end gap-6">
          <Button
            type="button"
            variant="outline"
            className="text-[14px] font-medium leading-5 text-[#A6A6A6] "
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="secondary"
            className="flex gap-2  text-[14px] font-medium leading-5 text-white items-center"
          >
            <Save />
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};
