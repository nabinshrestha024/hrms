import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

// Field names align with the canonical `workTypeSchema` (`@erp/data-access`):
// `name`, optional `description`. Phase 3.2 will replace the placeholder
// submit handler with `useCreateWorkType().mutate()`.
export const addWorkTypeFormConfig: FormViewConfig = {
  entity: 'work-type',

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Work Type Name',
      placeholder: 'Hybrid',
      isRequired: true,
      validation: { required: true, max: 100 },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      subLabel: 'Optional, less than 500 characters',
      validation: { max: 500 },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'name' },
      { type: 'field', name: 'description' },
    ],
  },
};

interface AddWorkTypeFormProps {
  onSuccess?: () => void;
}

export function AddWorkTypeForm({ onSuccess }: AddWorkTypeFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    // Phase 3.2 will replace this with useCreateWorkType().mutate(...).
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Work type added',
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
