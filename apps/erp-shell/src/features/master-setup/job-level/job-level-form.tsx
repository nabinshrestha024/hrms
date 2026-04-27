import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

// Field names align with the canonical `jobLevelSchema` (`@erp/data-access`):
// `name`, `rank`, optional `description`. Phase 3.2 will replace the
// placeholder submit handler with `useCreateJobLevel().mutate()`.
//
// Note: `hierarchyRank` was renamed to `rank` to match the canonical
// schema; the label still surfaces "1 = Top" so the UX is unchanged.
export const addJobLevelFormConfig: FormViewConfig = {
  entity: 'job-level',

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Job Level Name',
      placeholder: 'Senior',
      isRequired: true,
      validation: { required: true, max: 100 },
    },
    {
      name: 'rank',
      type: 'number',
      label: 'Rank (1 = Top)',
      placeholder: '1',
      isRequired: true,
      validation: { required: true, min: 1, max: 999 },
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
      { type: 'field', name: 'rank' },
      { type: 'field', name: 'description' },
    ],
  },
};

interface AddJobLevelFormProps {
  onSuccess?: () => void;
}

export function AddJobLevelForm({ onSuccess }: AddJobLevelFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    // Phase 3.2 will replace this with useCreateJobLevel().mutate(...).
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Job level added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addJobLevelFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Job Level"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
    />
  );
}
