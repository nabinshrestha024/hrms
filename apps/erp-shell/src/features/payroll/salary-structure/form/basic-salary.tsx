import { HRAccordionCard, HRCard, HRDateField, HRInput } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { SalaryStructureTemplateFormValue } from '../zod/SalaryStructure.zod';
export const BasicSalaryCard = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<SalaryStructureTemplateFormValue>();

  return (
    <HRCard
      cardClassName="px-3 py-2.5 border border-border rounded-[6px] shadow-none"
      cardContentClassName="p-0 "
    >
      <HRAccordionCard value="basic-salary" title="Basic Salary">
        <HRCard
          cardClassName="mt-6 p-0 border-none rounded-[6px] bg-white shadow-none"
          cardContentClassName="p-0 flex flex-col gap-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <HRInput
                Label="Basic Salary (Rs.)"
                placeholder="60000"
                error={errors.basicSalary?.message}
                {...register('basicSalary')}
              />
              <span className="text-[14px] text-secondary-foreground font-normal leading-5">
                This is the basic salary. Gross = Basic + Allowances
              </span>
            </div>
            <Controller
              name="effectiveFrom"
              control={control}
              render={({ field }) => (
                <HRDateField
                  Label="Effective From"
                  isRequired
                  placeholder="02/04/2026"
                  className="py-2.5 rounded-[6px] border border-[#E4E4E7]"
                  error={errors.effectiveFrom?.message as string}
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />
          </div>
          <HRCard
            cardClassName="px-3 py-2.5 border-none rounded-[8px] bg-[#EFF6FF] shadow-none"
            cardContentClassName="p-0 flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[14px] text-foreground font-medium leading-5">
                Calculated Gross Salary
              </span>
              <span className="text-[14px] text-secondary-foreground font-normal leading-5">
                Basic (Rs. 60,0000) + Allowances(Rs.0.00)
              </span>
            </div>
          </HRCard>
        </HRCard>
      </HRAccordionCard>
    </HRCard>
  );
};
