import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { financialSchema, type FinancialFormValue } from './FinancialDetailZod';
import { Employee } from '../../schema/employee-data';
import { HRInput } from '@erp/ui';

type Props = {
  employee: Employee;
  employeeId: string;
};
export const FinancialDetailEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialFormValue>({
    resolver: zodResolver(financialSchema) as Resolver<FinancialFormValue>,
    mode: 'onChange',
  });
  const onsubmit = (data: FinancialFormValue) => {
    console.warn('Submitted Form Data: ', data);
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onsubmit)} id="financialData">
          <div className="grid grid-cols-5 gap-4">
            <HRInput
              Label="Gross Salary"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.grossSalary?.message as string}
              {...register('grossSalary')}
            />
            <HRInput
              Label="Basic Salary"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.basicSalary?.message as string}
              {...register('basicSalary')}
            />
            <HRInput
              Label="Bank Name"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.bankName?.message as string}
              {...register('bankName')}
            />
            <HRInput
              Label="Bank Account Number"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.bankAccountNumber?.message as string}
              {...register('bankAccountNumber')}
            />
            <HRInput
              Label="Bank Account Name"
              labelClassName="text-[12px] font-medium leading-4 text-secondary-foreground"
              type="text"
              error={errors.bankAccountName?.message as string}
              {...register('bankAccountName')}
            />
          </div>
        </form>
      </div>
    </>
  );
};
