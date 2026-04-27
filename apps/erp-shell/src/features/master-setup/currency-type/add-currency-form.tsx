import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

// Field names align with the canonical `currencySchema` (`@erp/data-access`):
// `code`, `name`, `symbol`, optional `description`. Phase 3.2 will replace
// the placeholder submit handler with `useCreateCurrency().mutate()`.
export const addCurrencyFormConfig: FormViewConfig = {
  entity: 'currency',

  fields: [
    {
      name: 'code',
      type: 'text',
      label: 'Code',
      placeholder: 'NPR',
      subLabel: 'ISO 4217, three uppercase letters',
      isRequired: true,
      validation: {
        required: true,
        pattern: '^[A-Z]{3}$',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Nepalese Rupee',
      isRequired: true,
      validation: { required: true, max: 100 },
    },
    {
      name: 'symbol',
      type: 'text',
      label: 'Symbol',
      placeholder: 'e.g. $, €, रू',
      isRequired: true,
      validation: { required: true, max: 10 },
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
      { type: 'field', name: 'code' },
      { type: 'field', name: 'name' },
      { type: 'field', name: 'symbol' },
      { type: 'field', name: 'description' },
    ],
  },
};

interface AddCurrencyFormProps {
  onSuccess?: () => void;
}

export function AddCurrencyForm({ onSuccess }: AddCurrencyFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    // Phase 3.2 will replace this with useCreateCurrency().mutate(...).
    console.warn('Save Changes:', data);
    toast({
      variant: 'success',
      title: 'Currency added',
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
