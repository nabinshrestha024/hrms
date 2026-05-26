import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import {
  useCreateWorkType,
  useUpdateWorkType,
  WorkType,
} from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editWorkTypeFormConfig: FormViewConfig = {
  entity: 'edit-work-type',

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

interface EditWorkTypeFormProps {
  selectedWorkType?: WorkType;
}

export function EditWorkTypeForm({ selectedWorkType }: EditWorkTypeFormProps) {
  const updateWorkType = useUpdateWorkType(selectedWorkType?.id ?? '');
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    updateWorkType.mutate(
      {
        name: String(data.name ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Work type updated' });
          close();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to update work type',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editWorkTypeFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Work Type"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
      defaultValues={{
        name: selectedWorkType?.name ?? '',
        description: selectedWorkType?.description ?? '',
      }}
    />
  );
}
