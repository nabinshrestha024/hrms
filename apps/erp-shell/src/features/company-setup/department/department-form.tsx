import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateDepartment } from '@erp/data-access';
import { toast } from '@erp/ui';

export const addDepartmentFormConfig: FormViewConfig = {
  entity: 'department',
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

export function DepartmentForm() {
  const createDepartment = useCreateDepartment();

  const onsubmit = (data: Record<string, unknown>) => {
    createDepartment.mutate(
      {
        department: String(data.departmentName ?? ''),
        location: '',
        code: String(data.departmentId ?? ''),
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Department added successfully' });
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add department' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={addDepartmentFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Department"
      isDialogForm={true}
    />
  );
}
