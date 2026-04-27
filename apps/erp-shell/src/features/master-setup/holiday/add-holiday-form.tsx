import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateHolidayType } from '@erp/data-access';
import { toast } from '@erp/ui';

export const addHolidayFormConfig: FormViewConfig = {
  entity: 'holiday-type',

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Company Holiday',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'color',
      type: 'colorRadio',
      label: 'Indicator',
      isRequired: true,
      options: ['#EF4444', '#22C55E', '#3B82F6', '#EAB308', '#A855F7'],
      validation: { required: true },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      subLabel: 'Less than 500 characters',
      validation: { max: 500 },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'name' },
      { type: 'field', name: 'color' },
      { type: 'field', name: 'description' },
    ],
  },
};

interface AddHolidayFormProps {
  onSuccess?: () => void;
}

export function AddHolidayForm({ onSuccess }: AddHolidayFormProps) {
  const createHolidayType = useCreateHolidayType();

  const onsubmit = (data: Record<string, unknown>) => {
    createHolidayType.mutate(
      {
        name: String(data.name ?? ''),
        color: String(data.color ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Holiday type added' });
          onSuccess?.();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to add holiday type',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={addHolidayFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Holiday"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
    />
  );
}
