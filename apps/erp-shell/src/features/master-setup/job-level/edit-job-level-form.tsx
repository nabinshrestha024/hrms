import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { JobLevel, useCreateJobLevel } from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editJobLevelFormConfig: FormViewConfig = {
  entity: 'edit-job-level',

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

interface EditJobLevelFormProps {
  selectedJob?: JobLevel;
}

export function EditJobLevelForm({ selectedJob }: EditJobLevelFormProps) {
  const createJobLevel = useCreateJobLevel();
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    createJobLevel.mutate(
      {
        name: String(data.name ?? ''),
        rank: Number(data.rank ?? 1),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Job level edited' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to edit job level' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editJobLevelFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Job Level"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
      defaultValues={{
        name: selectedJob?.name ?? '',
        rank: selectedJob?.rank ?? 1,
        description: selectedJob?.description ?? '',
      }}
    />
  );
}
