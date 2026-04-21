import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addWorkTypeFormConfig: FormViewConfig = {
  entity: 'work-type',

  fields: [
    {
      name: 'workType',
      type: 'text',
      label: 'Work Type Name',
      placeholder: 'Intern',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      isRequired: true,
      subLabel: 'Less than 200 words',
      validation: {
        required: true,
        max: 200,
      },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'workType' },
      { type: 'field', name: 'description' },
    ],
  },
};
interface AddWorkTypeFormProps {
  onSuccess?: () => void;
}

export function AddWorkTypeForm({ onSuccess }: AddWorkTypeFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Work Type Added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addWorkTypeFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Work Type"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
    />
  );
}
