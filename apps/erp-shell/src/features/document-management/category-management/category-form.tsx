import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
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
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Category: ', data);
    toast({ variant: 'success', title: 'Category created' });
    onSuccess?.();
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
