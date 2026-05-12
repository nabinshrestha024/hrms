import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { financialSchema, type FinancialFormValue } from './FinancialDetailZod';
import { useUpdateEmployee, type Employee } from '@erp/data-access';
import { HRInput, toast } from '@erp/ui';

interface FinancialDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}

export const FinancialDetailEditForm = ({
  employee,
  onSuccess,
}: FinancialDetailEditFormProps) => {
  const updateEmployee = useUpdateEmployee(employee.id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialFormValue>({
    resolver: zodResolver(financialSchema) as Resolver<FinancialFormValue>,
    mode: 'onChange',
    defaultValues: {
      grossSalary: employee.salary != null ? String(employee.salary) : '',
      basicSalary:
        employee.basicSalary != null ? String(employee.basicSalary) : '',
      bankName: employee.bankName ?? '',
      bankAccountNumber: employee.bankAccountNumber ?? '',
      bankAccountName: employee.bankAccountName ?? '',
    },
  });
  const onsubmit = (data: FinancialFormValue) => {
    updateEmployee.mutate(
      {
        salary: Number(data.grossSalary),
        basicSalary: Number(data.basicSalary),
        bankName: data.bankName,
        bankAccountNumber: data.bankAccountNumber,
        bankAccountName: data.bankAccountName,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Financial details updated' });
          onSuccess();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to update financial details',
          });
        },
      }
    );
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <form onSubmit={handleSubmit(onsubmit)} id="financialData">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
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
