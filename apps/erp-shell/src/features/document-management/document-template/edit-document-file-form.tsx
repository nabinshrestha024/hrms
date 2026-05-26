import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { DocumentTemplate, useUpdateDocumentTemplate } from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';
import { CloudUpload } from 'lucide-react';

export const editdocumentTemplateFormConfig: FormViewConfig = {
  entity: 'edit-document-template',

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
    children: [
      { type: 'field', name: 'documentTitle' },
      { type: 'field', name: 'documentCategory' },
      { type: 'field', name: 'image' },
    ],
  },
};
interface editDocumentFileFormProps {
  selectedFile?: DocumentTemplate;
}
export function EditDocumentFileForm({
  selectedFile,
}: editDocumentFileFormProps) {
  const updateTemplate = useUpdateDocumentTemplate(selectedFile?.id ?? '');
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    updateTemplate.mutate(
      {
        name: String(data.documentTitle ?? ''),
        categroy: String(data.category ?? ''),
        kind: 'file',
      },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Document edit successfully',
          });
          close();
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to edit document',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editdocumentTemplateFormConfig}
      onSubmit={onsubmit}
      submitLabel="Edit Document"
      isDialogForm={true}
      defaultValues={{
        documentTitle: selectedFile?.name || '',
        documentCategory: selectedFile?.categroy || '',
      }}
    />
  );
}
