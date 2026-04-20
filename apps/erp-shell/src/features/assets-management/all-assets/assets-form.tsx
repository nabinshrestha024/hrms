import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const assetsFormConfig: FormViewConfig = {
  entity: 'assets',
  fields: [
    {
      name: 'assetsName',
      type: 'text',
      label: 'Assets Name',
      placeholder: 'e.g Macbook Pro 16”',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      isRequired: true,
      options: [
        'Electronics',
        'IT Equipment',
        'Vehicle',
        'Furniture',
        'Cleanliness',
      ],
      validation: { required: true },
    },

    {
      name: 'serialNumber',
      type: 'text',
      label: 'serialNumber',
      placeholder: 'e.g MBP-2026-125',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'condition',
      type: 'select',
      label: 'Condition',
      isRequired: true,
      options: ['Good', 'Excellent', 'Poor'],
      validation: { required: true },
    },
    {
      name: 'purchaseDate',
      type: 'date',
      label: 'Purchase Date',
      isRequired: true,
      placeholder: 'YYY-MM-DD',
      validation: { required: true },
    },
    {
      name: 'value',
      type: 'text',
      label: 'Value',
      isRequired: true,
      placeholder: '1000',
      validation: { required: true },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'assetsName' },
      { type: 'field', name: 'category' },
      { type: 'field', name: 'serialNumber' },
      { type: 'field', name: 'condition' },
      { type: 'field', name: 'purchaseDate' },
      { type: 'field', name: 'value' },
    ],
  },
};
interface AssetsFormProps {
  onSuccess?: () => void;
}

export function AssetsForm({ onSuccess }: AssetsFormProps = {}) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Assets added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={assetsFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
