import { HRCard, HRInput, Switch } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { FestivalBonusTemplateFormValue } from '../../../zod/FestivalBonus.zod';

export const EligibilityCriteria = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FestivalBonusTemplateFormValue>();

  return (
    <HRCard
      cardContentClassName="p-0 flex flex-col gap-6 "
      cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
    >
      <span className="text-[14px] font-medium leading-5 text-foreground">
        Eligibility Criteria
      </span>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <HRInput
            Label="Minimum Service Period (months)"
            placeholder="0"
            error={errors.minimumServicePeriod?.message}
            {...register('minimumServicePeriod')}
          />
          <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
            Employees must complete this many months to be eligible
          </span>
        </div>
        <HRCard
          cardContentClassName="p-0 flex flex-col gap-3 "
          cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-white"
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-medium leading-5 text-foreground">
                Pro-rata for New Employees
              </span>
              <Controller
                control={control}
                name="proRataforNewEmployees"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <span className="w-100 text-[14px] font-normal leading-5 text-secondary-foreground">
              Calculate proportional bonus for employees with less than 12
              months
            </span>
          </div>
        </HRCard>
      </div>

      <HRCard
        cardContentClassName="p-0 flex gap-2"
        cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none bg-muted"
      >
        <span className="text-[14px] font-medium leading-5 text-foreground">
          Pro-rata Formula :
        </span>
        <span className="text-[12px] font-normal leading-4 text-foreground">
          (Basic Salary ÷ 12 ) × Months Worked
        </span>
      </HRCard>
    </HRCard>
  );
};
