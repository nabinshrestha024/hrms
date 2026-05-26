import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateDocumentTemplate } from '@erp/data-access';
import { toast } from '@erp/ui';
import { CloudUpload } from 'lucide-react';
import { CreateTemplateField } from './create-template-field';

interface documentTemplateFormProps {
  onSuccess?: () => void;
  onCreateTemplate?: () => void;
}

export const documentTemplateFormConfig = (
  onCreateTemplate?: () => void
): FormViewConfig => ({
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
      label: 'Upload File',
      icon: CloudUpload,
      validation: { required: false },
      placeholder: 'Drag and drop to upload a file',
      subLabel: 'Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)',
    },
  ],

  layout: {
    type: 'section',
    header: <CreateTemplateField onClick={() => onCreateTemplate?.()} />,
    title: 'OR Upload File',
    children: [
      { type: 'field', name: 'documentTitle' },
      { type: 'field', name: 'documentCategory' },
      { type: 'field', name: 'image' },
    ],
  },
});

export function DocumentTemplateForm({
  onSuccess,
  onCreateTemplate,
}: documentTemplateFormProps = {}) {
  const createTemplate = useCreateDocumentTemplate();

  const onsubmit = (data: Record<string, unknown>) => {
    createTemplate.mutate(
      {
        name: String(data.documentTitle ?? ''),
        categroy: String(data.category ?? ''),
        kind: 'file',
      },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Document uploaded successfully',
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to upload document',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={documentTemplateFormConfig(onCreateTemplate)}
      onSubmit={onsubmit}
      submitLabel="Create Document"
      isDialogForm={true}
    />
  );
}
