import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import {
  useCreateAssetCategory,
  type AssetCategoryIconKey,
} from '@erp/data-access';
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
      options: [
        'electronics',
        'furniture',
        'vehicle',
        'it-equipment',
        'cleanliness',
      ],
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
  const createCategory = useCreateAssetCategory();

  const onsubmit = (data: Record<string, unknown>) => {
    createCategory.mutate(
      {
        name: String(data.categoryName ?? ''),
        iconKey: String(data.icons ?? 'electronics') as AssetCategoryIconKey,
        assetCount: 0,
        exampleAssets: [],
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Category added' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add category' });
        },
      }
    );
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
