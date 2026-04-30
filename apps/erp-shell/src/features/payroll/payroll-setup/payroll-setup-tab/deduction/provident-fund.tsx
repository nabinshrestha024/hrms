import { Badge, HRCard, HRInput, HRSelect, Switch } from '@erp/ui';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DeductionTemplateFormValue } from '../../../zod/Deduction.zod';

export const ProvidentFund = () => {
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
            Provident Fund (PF)
          </span>
          <div className="flex gap-3 items-center">
            <Badge variant="primary">20% Total</Badge>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>
        </div>
        {enabled && (
          <div className="grid grid-cols-3 gap-4">
            <HRInput
              Label="Employee Contribution"
              placeholder="30"
              error={errors.employeeContributionPF?.message}
              {...register('employeeContributionPF')}
            />

            <HRInput
              Label="Employer Contribution"
              placeholder="10"
              error={errors.employerContributionPF?.message}
              {...register('employerContributionPF')}
            />
            <Controller
              name="employerContributionPF"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Calculation Base"
                  isRequired
                  selectData={[]}
                  placeholder="Basic Salary Only"
                  value={field.value}
                  error={errors.employerContributionPF?.message as string}
                />
              )}
            />

            <HRInput
              Label="Maximum Contribution Limit (Rs.) - Leave empty for no limit"
              placeholder="No limit"
              error={errors.maximumContributionPF?.message}
              {...register('maximumContributionPF')}
            />
          </div>
        )}
      </HRCard>
    </div>
  );
};
