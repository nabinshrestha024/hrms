import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

// Field names align with the canonical `holidayTypeSchema`
// (`@erp/data-access`): `name`, `description`, `color`. Phase 3 will swap
// the placeholder submit handler below for `useCreateHolidayType().mutate()`.
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
  const onsubmit = (data: Record<string, unknown>) => {
    // Phase 3 will replace this with useCreateHolidayType().mutate(...).
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Holiday type added',
    });

    onSuccess?.();
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
