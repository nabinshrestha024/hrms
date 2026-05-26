import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import {
  AssetCategory,
  useCreateAssetCategory,
  type AssetCategoryIconKey,
} from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editAssetsCategoryFormConfig: FormViewConfig = {
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
interface EditCategoryFormProps {
  selectedCategory?: AssetCategory;
}

export function EditAssetsCategoryForm({
  selectedCategory,
}: EditCategoryFormProps) {
  const createCategory = useCreateAssetCategory();
  const close = useDialogClose();
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
          toast({ variant: 'success', title: 'Category edited' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to edit category' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editAssetsCategoryFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto"
      isDialogForm={true}
      defaultValues={{
        categoryName: selectedCategory?.name,
        icons: selectedCategory?.iconKey,
      }}
    />
  );
}
