import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addHolidayFormConfig: FormViewConfig = {
  entity: 'holiday',

  fields: [
    {
      name: 'leaveType',
      type: 'text',
      label: 'Leave Type',
      placeholder: 'Company Holiday',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'indicator',
      type: 'colorRadio',
      label: 'Leave Category',
      isRequired: true,
      options: ['#EF4444', '#22C55E', '#3B82F6', '#EAB308'],
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
        max: 100,
      },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'leaveType' },
      { type: 'field', name: 'indicator' },
      { type: 'field', name: 'description' },
    ],
  },
};
interface AddHolidayFormProps {
  onSuccess?: () => void;
}

export function AddHolidayForm({ onSuccess }: AddHolidayFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Holiday Added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addHolidayFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Holiday"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto "
    />
  );
}
