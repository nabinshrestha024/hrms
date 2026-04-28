import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateWorkType } from '@erp/data-access';
import { toast } from '@erp/ui';

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
  const createWorkType = useCreateWorkType();

  const onsubmit = (data: Record<string, unknown>) => {
    createWorkType.mutate(
      {
        name: String(data.name ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Work type added' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add work type' });
        },
      }
    );
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
