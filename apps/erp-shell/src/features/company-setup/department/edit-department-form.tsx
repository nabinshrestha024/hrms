import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { Department, useUpdateDepartment } from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editDepartmentFormConfig: FormViewConfig = {
  entity: 'edit-department',
  fields: [
    {
      name: 'departmentName',
      type: 'text',
      label: 'Department Name',
      placeholder: 'UI/UX',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'departmentId',
      type: 'text',
      label: 'Department ID',
      placeholder: 'DEP-012',
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
      { type: 'field', name: 'departmentName' },
      { type: 'field', name: 'departmentId' },
      { type: 'field', name: 'status' },
    ],
  },
};
type DepartmentFormProps = {
  selectedDepartment?: Department;
};
export function EditDepartmentForm({
  selectedDepartment,
}: DepartmentFormProps) {
  const editDepartment = useUpdateDepartment(selectedDepartment?.id ?? '');
  const close = useDialogClose();

  const onsubmit = (data: Record<string, unknown>) => {
    editDepartment.mutate(
      {
        department: String(data.departmentName ?? ''),
        location: '',
        code: String(data.departmentId ?? ''),
        status: data.status === 'Inactive' ? 'Inactive' : 'Active',
      },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Department edited successfully',
          });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to edit department' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editDepartmentFormConfig}
      onSubmit={onsubmit}
      submitLabel="Edit Department"
      isDialogForm={true}
      defaultValues={{
        departmentName: selectedDepartment?.department ?? '',
        departmentId: selectedDepartment?.code ?? '',
        address: selectedDepartment?.location ?? '',
        status: selectedDepartment?.status ?? 'Active',
      }}
    />
  );
}
