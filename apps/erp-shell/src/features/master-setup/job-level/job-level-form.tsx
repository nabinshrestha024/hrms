import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateJobLevel } from '@erp/data-access';
import { toast } from '@erp/ui';

// `hierarchyRank` was renamed to `rank` to match the canonical schema;
// the label still surfaces "1 = Top" so the UX is unchanged.
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
  const createJobLevel = useCreateJobLevel();

  const onsubmit = (data: Record<string, unknown>) => {
    createJobLevel.mutate(
      {
        name: String(data.name ?? ''),
        rank: Number(data.rank ?? 1),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Job level added' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add job level' });
        },
      }
    );
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
