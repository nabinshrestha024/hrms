import type { UseFormReturn } from 'react-hook-form';
import { Input, FormField } from '@erp/ui';
import type { AddEmployeeInput } from './schema';

interface StepProps {
  form: UseFormReturn<AddEmployeeInput>;
}

export function FinancialInfoStep({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6 pb-4">
      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Salary</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Gross Salary" htmlFor="grossSalary" error={errors.grossSalary?.message} required>
          <Input id="grossSalary" placeholder="Gross Salary" {...register('grossSalary')} />
        </FormField>
        <FormField label="Basic Salary" htmlFor="basicSalary" error={errors.basicSalary?.message} required>
          <Input id="basicSalary" placeholder="Basic Salary" {...register('basicSalary')} />
        </FormField>
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wide text-foreground pt-4">Bank Details</h3>

      <FormField label="Bank Name" htmlFor="bankName" error={errors.bankName?.message} required>
        <Input id="bankName" placeholder="Bank Name" {...register('bankName')} />
      </FormField>

      <FormField label="Bank Account Number" htmlFor="bankAccountNumber" error={errors.bankAccountNumber?.message} required>
        <Input id="bankAccountNumber" placeholder="Account Number" {...register('bankAccountNumber')} />
      </FormField>

      <FormField label="Bank Account Name" htmlFor="bankAccountName" error={errors.bankAccountName?.message} required>
        <Input id="bankAccountName" placeholder="XXXXXXXXXXXXXXXX" {...register('bankAccountName')} />
      </FormField>
    </div>
  );
}
