import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { Branch, useUpdateBranch } from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editBranchFormConfig: FormViewConfig = {
  entity: 'edit-branch',
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
type BranchFormProps = {
  selectedBranch?: Branch;
};
export function EditBranchForm({ selectedBranch }: BranchFormProps) {
  const editBranch = useUpdateBranch(selectedBranch?.id ?? '');
  const close = useDialogClose();

  const onsubmit = (data: Record<string, unknown>) => {
    editBranch.mutate(
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
          toast({ variant: 'success', title: 'Branch edit successfully' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to edit branch' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editBranchFormConfig}
      onSubmit={onsubmit}
      submitLabel="Edit Branch"
      isDialogForm={true}
      defaultValues={{
        branchName: selectedBranch?.branch ?? '',
        branchId: selectedBranch?.branchId ?? '',
        address: selectedBranch?.location ?? '',
        contact: selectedBranch?.contact ?? '',
        status: selectedBranch?.status ?? 'Active',
      }}
    />
  );
}
