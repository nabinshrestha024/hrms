import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const assetsCategoryFormConfig: FormViewConfig = {
  entity: 'assets-category',
  fields: [
    {
      name: 'categoryName',
      type: 'text',
      label: 'Category Name',
      placeholder: 'e.g Electronics',
      isRequired: true,
      validation: { required: true },
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Type here..',
      isRequired: true,
      subLabel: 'Less than 200 words',
      validation: {
        required: true,
        max: 200,
      },
    },
    {
      name: 'icons',
      type: 'select',
      label: 'Icon',
      isRequired: true,
      options: ['General'],
      validation: { required: true },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'categoryName' },
      { type: 'field', name: 'description' },
      { type: 'field', name: 'icons' },
    ],
  },
};
interface CategoryFormProps {
  onSuccess?: () => void;
}

export function AssetsCategoryForm({ onSuccess }: CategoryFormProps = {}) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Category added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={assetsCategoryFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
