import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const createTemplateFormConfig: FormViewConfig = {
  entity: 'create-template',

  fields: [
    {
      name: 'documentTitle',
      type: 'text',
      label: 'Document Title',
      placeholder: 'e.g., Remote Work Policy',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'documentCategory',
      type: 'select',
      label: 'Category',
      placeholder: 'Select',
      isRequired: true,
      options: ['Legal', 'Identity', 'Tax', 'Certification', 'Performance'],
      validation: { required: true },
    },
    {
      name: 'documentBody',
      type: 'textarea',
      label: 'Document Body (HTML)',
      placeholder: '<h1> Header <h1> <p> Rules go here..... <p>',
      textAreaClassName: 'h-[437px] overflow-auto',
      validation: { required: false },
    },
  ],

  layout: {
    type: 'section',
    title: 'Create Internal Policy',
    children: [
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'documentTitle' },
          { type: 'field', name: 'documentCategory' },
        ],
      },
      { type: 'field', name: 'documentBody' },
    ],
  },
};

interface createTemplateFormProps {
  onSuccess?: () => void;
}

export function CreateTemplateForm({
  onSuccess,
}: createTemplateFormProps = {}) {
  const onsubmit = (_data: Record<string, unknown>) => {
    toast({
      variant: 'success',
      title: 'Document uploaded successfully',
    });
    onSuccess?.();
  };

  return (
    <FormRenderer
      config={createTemplateFormConfig}
      onSubmit={onsubmit}
      submitLabel="Create Template"
      isDialogForm={true}
    />
  );
}
