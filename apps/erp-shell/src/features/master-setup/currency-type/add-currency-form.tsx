import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addCurrencyFormConfig: FormViewConfig = {
  entity: 'currency',

  fields: [
    {
      name: 'currencyName',
      type: 'text',
      label: 'Currency Name',
      placeholder: 'Nepali Rupees',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'currencySymbol',
      type: 'text',
      label: 'Currency Symbol',
      placeholder: 'e.g. $, €, रू',
      isRequired: true,
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
        max: 200,
      },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'currencyName' },
      { type: 'field', name: 'currencySymbol' },
      { type: 'field', name: 'description' },
    ],
  },
};
interface AddCurrencyFormProps {
  onSuccess?: () => void;
}
export function AddCurrencyForm({ onSuccess }: AddCurrencyFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);
    toast({
      variant: 'success',
      title: 'Currency Added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addCurrencyFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Currency"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
    />
  );
}
