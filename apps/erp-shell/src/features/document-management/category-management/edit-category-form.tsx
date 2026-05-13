import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { DocumentCategory, useUpdateDocumentCategory } from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editCategoryFormConfig: FormViewConfig = {
  entity: 'edit-category',
  fields: [
    {
      name: 'categoryName',
      type: 'text',
      label: 'Category Name',
      placeholder: 'Tax Form W-4',
      isRequired: true,
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',
    children: [{ type: 'field', name: 'categoryName' }],
  },
};
interface categoryFormProps {
  selectedCategory?: DocumentCategory;
}
export function EditCategoryForm({ selectedCategory }: categoryFormProps = {}) {
  const updateCategory = useUpdateDocumentCategory(selectedCategory?.id ?? '');
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    updateCategory.mutate(
      {
        name: String(data.categoryName ?? ''),
        documentCount: 0,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Category edited successfully' });
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
      config={editCategoryFormConfig}
      onSubmit={onsubmit}
      submitLabel="Edit Category"
      isDialogForm={true}
      defaultValues={{
        categoryName: selectedCategory?.name || '',
      }}
    />
  );
}
