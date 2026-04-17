import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateNotice } from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';
import { CloudUpload } from 'lucide-react';

export const createAnnouncementFormConfig: FormViewConfig = {
  entity: 'announcement',
  fields: [
    {
      name: 'announcementTitle',
      type: 'text',
      label: 'Announcement Title',
      placeholder: 'Holiday',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'branch',
      type: 'select',
      label: 'Branch',
      isRequired: true,
      options: ['Baneshwor', 'Chabhail', 'Koteshwor', 'Thamel', 'Kalanki'],
      validation: { required: true },
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      isRequired: true,
      options: ['HR', 'UI/UX Designer', 'Frontend', 'Backend'],
      validation: { required: true },
    },
    {
      name: 'priority',
      type: 'select',
      label: 'Priority',
      isRequired: true,
      options: ['Important', 'Notice', 'Info'],
      validation: { required: true },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
      isRequired: true,
      subLabel: 'Less than 200 words',
      validation: {
        required: true,
        max: 200,
      },
    },
    {
      name: 'image',
      icon: CloudUpload,
      type: 'file',
      label: 'Drag and drop to upload a file',
      subLabel: 'Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)',
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'announcementTitle' },
      { type: 'field', name: 'branch' },
      { type: 'field', name: 'department' },
      { type: 'field', name: 'priority' },
      { type: 'field', name: 'shortDescription' },
      { type: 'field', name: 'image' },
    ],
  },
};
export function CreateAnnouncementForm() {
  const createNotice = useCreateNotice();
  const close = useDialogClose();

  const onsubmit = (data: Record<string, unknown>) => {
    createNotice.mutate(
      {
        title: String(data.announcementTitle ?? ''),
        description: String(data.shortDescription ?? ''),
        image: '/noticeImage/annualImage.png',
        noticeType:
          (data.priority as 'Important' | 'Info' | 'Notice') ?? 'Info',
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Notice created' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to create notice' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={createAnnouncementFormConfig}
      onSubmit={onsubmit}
      submitLabel="Create Notice"
      fieldsetClassName="max-h-161 overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
