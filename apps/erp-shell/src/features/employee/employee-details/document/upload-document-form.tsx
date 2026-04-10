import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { CloudUpload } from 'lucide-react';

export const uploadDocumentFormConfig: FormViewConfig = {
  entity: 'uploadDocument',

  fields: [
    {
      name: 'documentTemplate',
      type: 'text',
      label: 'Document Name',
      placeholder: 'Offer Letter',
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
    {
      name: 'date',
      type: 'date',
      label: 'Due Date',
      placeholder: 'YYYY-MM-DD',
      validation: { required: false },
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Note for Employee',
      placeholder: 'Type here',
      subLabel: 'Less than 200 words',
      validation: { required: false, max: 200 },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'documentTemplate' },
      { type: 'field', name: 'documentCategory' },
      { type: 'field', name: 'image' },
      { type: 'field', name: 'date' },
      { type: 'field', name: 'note' },
    ],
  },
};

interface UploadDocumentFormProps {
  onSuccess?: () => void;
}

export function UploadDocumentForm({
  onSuccess,
}: UploadDocumentFormProps = {}) {
  const onsubmit = (_data: Record<string, unknown>) => {
    toast({
      variant: 'success',
      title: 'Document uploaded successfully',
    });
    onSuccess?.();
  };

  return (
    <FormRenderer
      config={uploadDocumentFormConfig}
      onSubmit={onsubmit}
      submitLabel="Upload Document"
      isDialogForm={true}
    />
  );
}
