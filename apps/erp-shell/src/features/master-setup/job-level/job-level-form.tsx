import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addJobLevelFormConfig: FormViewConfig = {
  entity: 'job-level',

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Job Level Name',
      placeholder: 'name',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'hierarchyRank',
      type: 'number',
      label: 'Hierarchy Rank (1 = Top)',
      placeholder: '1',
      isRequired: true,
      validation: {
        required: true,
      },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'name' },
      { type: 'field', name: 'hierarchyRank' },
    ],
  },
};

interface AddJobLevelFormProps {
  onSuccess?: () => void;
}

export function AddJobLevelForm({ onSuccess }: AddJobLevelFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Job Level Added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addJobLevelFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Job Level"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto "
    />
  );
}
