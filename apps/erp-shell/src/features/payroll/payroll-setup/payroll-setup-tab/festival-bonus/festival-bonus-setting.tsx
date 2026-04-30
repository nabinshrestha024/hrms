import { HRCard, HRInput, HRSelect, Switch } from '@erp/ui';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FestivalBonusTemplateFormValue } from '../../../zod/FestivalBonus.zod';
import { EligibilityCriteria } from './eligibility-Criteria';
import { calculationBaseOption } from '../../../schema/FestivalBonusData';
import { GrossSalaryPercentage } from './gross-salary-percentage';

export const FestivalBonusSetting = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FestivalBonusTemplateFormValue>();

  const [enabled, setEnabled] = useState(false);
  const selectedBase = watch('calculationBase');

  const calculationBase = calculationBaseOption.map((calculation) => ({
    id: calculation.id,
    content: calculation.calculationBase,
    value: calculation.calculationBase,
  }));

  const selectedFormula = calculationBaseOption.find(
    (item) => item.calculationBase === selectedBase
  )?.formula;

  return (
    <div>
      <HRCard
        cardContentClassName="p-0 flex flex-col gap-3 "
        cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
      >
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-medium leading-5 text-foreground">
            Festival Bonus Settings
          </span>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
        {enabled && (
          <div className="flex flex-col gap-6 ">
            <div className="grid grid-cols-2 gap-4">
              <HRInput
                Label="Bonus Name"
                placeholder="Dashain Bonus"
                error={errors.bonusName?.message}
                {...register('bonusName')}
              />

              <HRInput
                Label="Bonus Amount (in months of salary)"
                placeholder="10"
                error={errors.bonusAmount?.message}
                {...register('bonusAmount')}
              />
              <div className="flex flex-col gap-1">
                <Controller
                  name="calculationBase"
                  control={control}
                  render={({ field }) => (
                    <HRSelect
                      Label="Calculation Base"
                      isRequired
                      selectData={calculationBase}
                      placeholder="Basic Salary Only"
                      value={field.value}
                      onValueChange={field.onChange}
                      error={errors.calculationBase?.message as string}
                    />
                  )}
                />

                {selectedFormula && (
                  <span className="text-[14px] font-normal leading-5 text-secondary-foreground">
                    {selectedFormula}
                  </span>
                )}
              </div>

              <Controller
                name="disbursementMonth"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Disbursement Month"
                    selectData={[]}
                    placeholder="Ashwin"
                    value={field.value}
                    error={errors.disbursementMonth?.message as string}
                  />
                )}
              />
            </div>
            {selectedFormula === 'Bonus = 60% of Gross × Months' && (
              <GrossSalaryPercentage />
            )}
            <EligibilityCriteria />
          </div>
        )}
      </HRCard>
    </div>
  );
};
