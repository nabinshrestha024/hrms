import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import {
  Currency,
  useCreateCurrency,
  useUpdateCurrency,
} from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editCurrencyFormConfig: FormViewConfig = {
  entity: 'edit-currency',

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

interface EditCurrencyFormProps {
  selectedCurrency?: Currency;
}

export function EditCurrencyForm({ selectedCurrency }: EditCurrencyFormProps) {
  const updateCurrency = useUpdateCurrency(selectedCurrency?.id ?? '');
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    updateCurrency.mutate(
      {
        code: String(data.code ?? ''),
        name: String(data.name ?? ''),
        symbol: String(data.symbol ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Currency added' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add currency' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editCurrencyFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Currency"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
      defaultValues={{
        code: selectedCurrency?.code ?? '',
        name: selectedCurrency?.name ?? '',
        symbol: selectedCurrency?.symbol ?? '',
      }}
    />
  );
}
