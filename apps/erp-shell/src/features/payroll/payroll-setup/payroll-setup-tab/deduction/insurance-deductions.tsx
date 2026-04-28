import { HRCard, HRInput, HRSelect, Switch } from '@erp/ui';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DeductionTemplateFormValue } from '../../../zod/Deduction.zod';

export const InsuranceDeductions = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DeductionTemplateFormValue>();

  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <HRCard
        cardContentClassName="p-0 flex flex-col gap-3 "
        cardClassName="p-6 border border-border rounded-[6px] shadow-none bg-white"
      >
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-medium leading-5 text-foreground">
            Insurance Deductions
          </span>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
        {enabled && (
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="deductionType"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Deduction Type"
                  isRequired
                  selectData={[]}
                  placeholder="Fixed Amount"
                  value={field.value}
                  error={errors.deductionType?.message as string}
                />
              )}
            />

            <HRInput
              Label="Life Insurance (Rs.)"
              placeholder="5000"
              error={errors.lifeInsurance?.message}
              {...register('lifeInsurance')}
            />

            <HRInput
              Label="Medical Insurance (Rs.)"
              placeholder="3000"
              error={errors.medicalInsurance?.message}
              {...register('medicalInsurance')}
            />

            <HRInput
              Label="Accident Insurance (Rs.)"
              placeholder="2000"
              error={errors.accidentInsurance?.message}
              {...register('accidentInsurance')}
            />
          </div>
        )}
      </HRCard>
    </div>
  );
};
