import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { CloudUpload } from 'lucide-react';
import { CreateTemplateField } from './create-template-field';

export const documentTemplateFormConfig: FormViewConfig = {
  entity: 'document-template',

  fields: [
    {
      name: 'documentTitle',
      type: 'text',
      label: 'Document Title',
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
      name: 'image',
      type: 'file',
      Label: 'Upload File',
      icon: CloudUpload,
      validation: { required: false },
      label: 'Drag and drop to upload a file',
      subLabel: 'Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)',
    },
  ],

  layout: {
    type: 'section',
    header: <CreateTemplateField />,
    title: 'OR Upload File',
    children: [
      { type: 'field', name: 'documentTitle' },
      { type: 'field', name: 'documentCategory' },
      { type: 'field', name: 'image' },
    ],
  },
};

interface documentTemplateFormProps {
  onSuccess?: () => void;
}

export function DocumentTemplateForm({
  onSuccess,
}: documentTemplateFormProps = {}) {
  const onsubmit = (_data: Record<string, unknown>) => {
    toast({
      variant: 'success',
      title: 'Document uploaded successfully',
    });
    onSuccess?.();
  };

  return (
    <FormRenderer
      config={documentTemplateFormConfig}
      onSubmit={onsubmit}
      submitLabel="Create Document"
      isDialogForm={true}
    />
  );
}
