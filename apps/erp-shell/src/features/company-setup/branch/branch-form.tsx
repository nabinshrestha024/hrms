import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateBranch } from '@erp/data-access';
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
  const createBranch = useCreateBranch();

  const onsubmit = (data: Record<string, unknown>) => {
    createBranch.mutate(
      {
        branchId: String(data.branchId ?? ''),
        branch: String(data.branchName ?? ''),
        location: String(data.address ?? ''),
        contact: String(data.contact ?? ''),
        status: data.status === 'Inactive' ? 'Inactive' : 'Active',
        createdDate: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Branch added successfully' });
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add branch' });
        },
      }
    );
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
