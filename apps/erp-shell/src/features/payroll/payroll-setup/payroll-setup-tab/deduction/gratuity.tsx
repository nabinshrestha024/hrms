import { HRCard, HRInput, Switch } from '@erp/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DeductionTemplateFormValue } from '../../../zod/Deduction.zod';

export const Gratuity = () => {
  const {
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
            Gratuity
          </span>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>
        {enabled && (
          <div className="grid grid-cols-2 gap-4">
            <HRInput
              Label="Gratuity Rate"
              subLabel="% of basic"
              placeholder="10"
              error={errors.gratuityRate?.message}
              {...register('gratuityRate')}
            />
            <HRInput
              Label="Eligibility (Years of Service)"
              placeholder="30"
              error={errors.eligibility?.message}
              {...register('eligibility')}
            />
          </div>
        )}
      </HRCard>
    </div>
  );
};
