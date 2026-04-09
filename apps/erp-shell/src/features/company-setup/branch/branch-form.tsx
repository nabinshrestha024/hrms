import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addBranchFormConfig: FormViewConfig = {
  entity: 'branch',
  fields: [
    {
      name: 'branchName',
      type: 'text',
      label: 'Branch Name',
      placeholder: 'Baneshwor',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'branchId',
      type: 'text',
      label: 'Branch ID',
      placeholder: 'BAN-012',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Baneshwor',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Contact Number',
      placeholder: '01-40000000',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      isRequired: true,
      options: ['Active', 'Inactive'],
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'branchName' },
      { type: 'field', name: 'branchId' },
      { type: 'field', name: 'address' },
      { type: 'field', name: 'contact' },
      { type: 'field', name: 'status' },
    ],
  },
};

export function BranchForm() {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);
    toast({ variant: 'success', title: 'Branch added successfully' });
  };

  return (
    <FormRenderer
      config={addBranchFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Branch"
      isDialogForm={true}
    />
  );
}
