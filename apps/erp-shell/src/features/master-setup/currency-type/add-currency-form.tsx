import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateCurrency } from '@erp/data-access';
import { toast } from '@erp/ui';

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
  const createCurrency = useCreateCurrency();

  const onsubmit = (data: Record<string, unknown>) => {
    createCurrency.mutate(
      {
        code: String(data.code ?? ''),
        name: String(data.name ?? ''),
        symbol: String(data.symbol ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Currency added' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add currency' });
        },
      }
    );
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
