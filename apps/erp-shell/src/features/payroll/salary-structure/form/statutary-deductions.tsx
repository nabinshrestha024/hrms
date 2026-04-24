import { HRAccordionCard, HRCard, HRInput, HRSelect, Switch } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { SalaryStructureTemplateFormValue } from '../zod/SalaryStructure.zod';
import { useState } from 'react';
export const StatutaryDeductionCard = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SalaryStructureTemplateFormValue>();
  const [enableSSF, setEnableSSF] = useState(false);
  const [enablePF, setEnablePF] = useState(false);
  const [enableCIT, setEnableCIT] = useState(false);
  const [enableInsurance, setEnableInsurance] = useState(false);

  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none"
      cardContentClassName="p-0 "
    >
      <HRAccordionCard value="statutary-deduction" title="Statutary Deduction">
        <HRCard
          cardClassName="mt-6 p-0 border-none rounded-[6px] bg-white shadow-none"
          cardContentClassName="p-0 flex flex-col gap-4"
        >
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-muted shadow-none"
            cardContentClassName="p-0 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <span>Social Security Fund (SSF)</span>
              <Switch checked={enableSSF} onCheckedChange={setEnableSSF} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Controller
                name="calculationType"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Calculation Type"
                    selectData={[]}
                    placeholder="Fixed Amount"
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!enableSSF}
                  />
                )}
              />

              <HRInput
                Label="Fixed Amount (Rs.)"
                placeholder="110"
                {...register('fixedAmount')}
                disabled={!enableSSF}
              />
            </div>
          </HRCard>
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-muted shadow-none"
            cardContentClassName="p-0 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <span>Provident Fund (PF)</span>
              <Switch checked={enablePF} onCheckedChange={setEnablePF} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Controller
                name="calculationType"
                control={control}
                render={({ field }) => (
                  <HRSelect
                    Label="Calculation Type"
                    selectData={[]}
                    placeholder="Fixed Amount"
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!enablePF}
                  />
                )}
              />

              <HRInput
                Label="Fixed Amount (Rs.)"
                placeholder="110"
                {...register('fixedAmount')}
                disabled={!enablePF}
              />
            </div>
          </HRCard>
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-muted shadow-none"
            cardContentClassName="p-0 "
          >
            <div className="flex justify-between items-center">
              <span>Citizen Investment Trust (CIT)</span>
              <Switch checked={enableCIT} onCheckedChange={setEnableCIT} />
            </div>
          </HRCard>
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-muted shadow-none"
            cardContentClassName="p-0 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center">
              <span>Insurance Premiums</span>
              <Switch
                checked={enableInsurance}
                onCheckedChange={setEnableInsurance}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <HRInput
                Label="Life Insurance (Rs.)"
                placeholder="110"
                {...register('lifeInsurance')}
                disabled={!enablePF}
              />
              <HRInput
                Label="Medical Insurance (Rs.)"
                placeholder="110"
                {...register('medicalInsurance')}
                disabled={!enablePF}
              />

              <HRInput
                Label="Accident Insurance (Rs.)"
                placeholder="110"
                {...register('accidentInsurance')}
                disabled={!enablePF}
              />
            </div>
          </HRCard>
        </HRCard>
      </HRAccordionCard>
    </HRCard>
  );
};
