import { HRDateField } from '@erp/ui';
import { Controller, useFormContext } from 'react-hook-form';

export const EmployeeDateForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">
        EMPLOYEMENT DATES
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="joiningDate"
            control={control}
            render={({ field }) => (
              <HRDateField
                Label="Joining"
                isRequired={true}
                error={errors.joiningDate?.message as string}
                date={field.value}
                onDateChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="contractStartDate"
            control={control}
            render={({ field }) => (
              <HRDateField
                Label="Contract Start Date"
                isRequired={true}
                error={errors.contractStartDate?.message as string}
                date={field.value}
                onDateChange={field.onChange}
              />
            )}
          />
          <Controller
            name="contractEndDate"
            control={control}
            render={({ field }) => (
              <HRDateField
                Label="Contract End Date"
                isRequired={true}
                error={errors.contractEndDate?.message as string}
                date={field.value}
                onDateChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
