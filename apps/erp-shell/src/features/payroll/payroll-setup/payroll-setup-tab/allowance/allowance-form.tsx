import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast, useDialogClose } from '@erp/ui';

export const addAllowanceFormConfig: FormViewConfig = {
  entity: 'payroll-allowance-form',
  fields: [
    {
      name: 'allowanceName',
      type: 'text',
      label: 'Allowance Name',
      placeholder: 'e.g., House Rent Allowance',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'code',
      type: 'text',
      label: 'Code',
      placeholder: 'e.g., HRA',
      isRequired: true,
      validation: { required: true },
    },

    {
      name: 'taxType',
      type: 'select',
      label: 'Tax Type',
      isRequired: true,
      options: ['Taxable', 'Non-Taxable', 'Partially Taxable'],
      validation: { required: true },
    },
    {
      name: 'calculationType',
      type: 'select',
      label: 'Calculation Type',
      isRequired: true,
      options: ['Fixed Amount', 'Percentage'],
      validation: { required: true },
    },
    {
      name: 'amount',
      type: 'text',
      label: 'Amount',
      placeholder: '0',
      isRequired: true,
      validation: { required: true },
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Brief description of the allowance',
      validation: { max: 100 },
    },
  ],
  layout: {
    type: 'section',
    children: [
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'allowanceName' },
          { type: 'field', name: 'code' },
        ],
      },
      { type: 'field', name: 'taxType' },
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'calculationType' },
          { type: 'field', name: 'amount' },
        ],
      },
      { type: 'field', name: 'description' },
    ],
  },
};

export function AllowanceForm() {
  //   const createAllowance = useCreateAllowance();
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Created Allowances Data: ', data);
    toast({ variant: 'success', title: 'Allowance added successfully' });
    close();
  };

  return (
    <FormRenderer
      config={addAllowanceFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Allowance"
      isDialogForm={true}
    />
  );
}
