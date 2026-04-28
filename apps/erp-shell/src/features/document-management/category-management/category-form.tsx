import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateDocumentCategory } from '@erp/data-access';
import { toast } from '@erp/ui';

export const addCategoryFormConfig: FormViewConfig = {
  entity: 'category',
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
  onSuccess?: () => void;
}
export function CategoryForm({ onSuccess }: categoryFormProps = {}) {
  const createCategory = useCreateDocumentCategory();

  const onsubmit = (data: Record<string, unknown>) => {
    createCategory.mutate(
      {
        name: String(data.categoryName ?? ''),
        documentCount: 0,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Category created' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to create category' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={addCategoryFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Category"
      isDialogForm={true}
    />
  );
}
