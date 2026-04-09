import { HRInput } from '@erp/ui';
import { useFormContext } from 'react-hook-form';

export const EmployeeDateForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">
        EMPLOYEMENT DATES
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <HRInput
            Label="Joining"
            type="date"
            isRequired
            error={errors.joiningDate?.message as string}
            {...register('joiningDate')}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <HRInput
            Label="Contract Start Date"
            type="date"
            isRequired
            error={errors.contractStartDate?.message as string}
            {...register('contractStartDate')}
          />

          <HRInput
            Label="Contract End Date"
            type="date"
            isRequired
            error={errors.contractEndDate?.message as string}
            {...register('contractEndDate')}
          />
        </div>
      </div>
    </div>
  );
};
