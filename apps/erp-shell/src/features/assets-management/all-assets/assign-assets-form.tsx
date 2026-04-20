import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const assignAssetsFormConfig: FormViewConfig = {
  entity: 'assign-assets',
  fields: [
    {
      name: 'assetsName',
      type: 'text',
      label: 'Assets Name',
      placeholder: 'e.g Macbook Pro 16”',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'employeeName',
      type: 'select',
      label: 'Employee Name',
      isRequired: true,
      options: ['Sita'],
      validation: { required: true },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'assetsName' },
      { type: 'field', name: 'employeeName' },
    ],
  },
};
interface AssignAssetsFormProps {
  onSuccess?: () => void;
}

export function AssignAssetsForm({ onSuccess }: AssignAssetsFormProps = {}) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Assign Assets ',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={assignAssetsFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
