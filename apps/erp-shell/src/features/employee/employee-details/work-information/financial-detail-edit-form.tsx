import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { Employee, useUpdateEmployee } from '@erp/data-access';

export const financialDetailFormConfig: FormViewConfig = {
  entity: 'financial-data-edit',

  fields: [
    {
      name: 'grossSalary',
      type: 'text',
      label: 'Gross Salary',
      validation: { required: true },
    },
    {
      name: 'basicSalary',
      type: 'text',
      label: 'Basic Salary',
      validation: { required: true },
    },
    {
      name: 'bankName',
      type: 'text',
      label: 'Bank Name',
    },
    {
      name: 'bankAccountNumber',
      type: 'text',
      label: 'Bank Account Number',
    },
    {
      name: 'bankAccountName',
      type: 'text',
      label: 'Bank Account Name',
    },
  ],

  layout: {
    type: 'section',

    children: [
      {
        type: 'columns',
        classname:
          'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4',

        children: [
          { type: 'field', name: 'grossSalary' },
          { type: 'field', name: 'basicSalary' },
          { type: 'field', name: 'bankName' },
          { type: 'field', name: 'bankAccountNumber' },
          { type: 'field', name: 'bankAccountName' },
        ],
      },
    ],
  },
};

interface FinancialDetailEditFormProps {
  employee: Employee;
  onSuccess: () => void;
}

export function FinancialDetailEditForm({
  employee,
  onSuccess,
}: FinancialDetailEditFormProps) {
  const updateEmployee = useUpdateEmployee(employee.id);

  const onSubmit = (data: Record<string, unknown>) => {
    updateEmployee.mutate(
      {
        salary: Number(data.grossSalary ?? 0),
        basicSalary: Number(data.basicSalary ?? 0),
        bankName: String(data.bankName ?? ''),
        bankAccountNumber: String(data.bankAccountNumber ?? ''),
        bankAccountName: String(data.bankAccountName ?? ''),
      },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Financial details updated',
          });

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
    <FormRenderer
      config={financialDetailFormConfig}
      onSubmit={onSubmit}
      submitLabel="Save Details"
      isDialogForm={false}
      defaultValues={{
        grossSalary: employee.grossSalary ?? '',
        basicSalary: employee.basicSalary ?? '',
        bankName: employee.bankName ?? '',
        bankAccountNumber: employee.bankAccountNumber ?? '',
        bankAccountName: employee.bankAccountName ?? '',
      }}
    />
  );
}
