import { HRInput } from '@erp/ui';
import { useFormContext } from 'react-hook-form';

export const SalaryForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[16px] font-semibold leading-6">SALARY</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HRInput
          Label="Gross Salary"
          type="text"
          isRequired
          placeholder="Gross Salary"
          error={errors.grossSalary?.message as string}
          {...register('grossSalary')}
        />

        <HRInput
          Label="Basic Salary"
          type="text"
          isRequired
          placeholder="Basic Salary"
          error={errors.basicSalary?.message as string}
          {...register('basicSalary')}
        />
      </div>
    </div>
  );
};
