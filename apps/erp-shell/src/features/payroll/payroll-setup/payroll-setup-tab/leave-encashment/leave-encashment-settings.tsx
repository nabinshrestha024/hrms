import { HRCard, HRInput, HRSelect, OptionRadioGroup, Switch } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { encashmentOptions } from '../../../schema/LeaveEncashmentData';
import { LeaveEncashmentTemplateFormValue } from '../../../zod/LeaveEncashment.zod';
import { EncashmentLeaveType } from './encashable-leave-types';

export const LeaveEncashmentSetting = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<LeaveEncashmentTemplateFormValue>();
  const [enabled, setEnabled] = useState(false);

  return (
    <HRCard
      cardContentClassName="p-0 flex flex-col gap-6 "
      cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
    >
      <div className="flex justify-between items-center">
        <span className="text-[14px] font-medium leading-5 text-foreground">
          Leave Encashment Settings
        </span>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      {enabled && (
        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="encashment"
            render={({ field }) => (
              <OptionRadioGroup
                options={encashmentOptions}
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-3 gap-4"
                optionClassName="border border-border rounded-[6px] px-3 py-2.5 items-start gap-4"
                itemClassName="border-muted-foreground shadow-none"
                error={errors.encashment?.message}
              />
            )}
          />
          <HRCard
            cardContentClassName="p-0 flex  gap-1"
            cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-muted"
          >
            <span className="text-[14px] font-medium leading-5 text-foreground">
              Encashment Formula :
            </span>
            <span className="text-[12px] font-normal leading-4 text-foreground">
              (Basic ÷ 26) × Leave Days
            </span>
          </HRCard>
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="workingDays"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Working Days in Month"
                  isRequired
                  selectData={[]}
                  placeholder="26 Days"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.workingDays?.message as string}
                />
              )}
            />
            <HRInput
              Label="Maximum Encashable Days"
              placeholder="10"
              error={errors.maximumEncashableDays?.message}
              {...register('maximumEncashableDays')}
            />
            <HRInput
              Label="Minimum Balance to Retain"
              placeholder="10"
              error={errors.minimumBalanceRetain?.message}
              {...register('minimumBalanceRetain')}
            />
            <Controller
              name="amountRounding"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Amount Rounding"
                  isRequired
                  selectData={[]}
                  placeholder="Round to Nearest"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.amountRounding?.message as string}
                />
              )}
            />
          </div>
          <EncashmentLeaveType />
        </div>
      )}
    </HRCard>
  );
};
