import { HRCard, HRInput, OptionRadioGroup, Switch } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { encashmentAllowedOptions } from '../../../schema/LeaveEncashmentData';
import { LeaveEncashmentTemplateFormValue } from '../../../zod/LeaveEncashment.zod';

export const EncashmentTiming = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<LeaveEncashmentTemplateFormValue>();

  return (
    <HRCard
      cardContentClassName="p-0 flex flex-col gap-6 "
      cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
    >
      <span className="text-[18px] font-medium leading-7 text-foreground">
        Encashment Timing & Rules
      </span>
      <span className="text-[16px] font-medium leading-6 text-foreground">
        Encashment Allowed
      </span>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="encashmentAllowed"
          render={({ field }) => (
            <OptionRadioGroup
              options={encashmentAllowedOptions}
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-col gap-4"
              optionClassName="border border-border rounded-[6px] px-3 py-2.5 items-start gap-4"
              itemClassName="border-muted-foreground shadow-none"
              error={errors.encashmentAllowed?.message}
            />
          )}
        />
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-3 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-medium leading-5 text-foreground">
                Leave Encashment is Taxable
              </span>
              <Controller
                control={control}
                name="taxable"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <span className="w-100 text-[14px] font-normal leading-5 text-secondary-foreground">
              Amount will be added to taxable income
            </span>
          </div>
        </HRCard>

        <HRInput
          Label="Annual Tax Exempt Limit (Rs.)"
          placeholder="No limit"
          error={errors.annualTax?.message}
          {...register('annualTax')}
        />

        <HRCard
          cardContentClassName="p-0 flex flex-col gap-3 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-medium leading-5 text-foreground">
                Require Manager/HR Approval
              </span>
              <Controller
                control={control}
                name="hrApproval"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <span className="w-100 text-[14px] font-normal leading-5 text-secondary-foreground">
              Encashment requests must be approved before processing
            </span>
          </div>
        </HRCard>
      </div>
    </HRCard>
  );
};
