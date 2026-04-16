import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { CloudUpload } from 'lucide-react';

export const addLeaveRequestFormConfig: FormViewConfig = {
  entity: 'leave-request',
  fields: [
    {
      name: 'employeeName',
      type: 'text',
      label: 'Employee Name',
      placeholder: 'Employee Name',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      placeholder: 'YYYY-MM-DD',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      placeholder: 'YYYY-MM-DD',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'leaveType',
      type: 'select',
      label: 'Leave Type',
      isRequired: true,
      options: ['Annual Leave', 'Sick Leave', 'Unpaid'],
      validation: { required: true },
    },
    {
      name: 'durationType',
      type: 'select',
      label: 'Duration Type',
      isRequired: true,
      options: ['Full', 'First Half', 'Second Half'],
      validation: { required: true },
    },
    {
      name: 'substitutionColleague',
      type: 'text',
      label: 'Substitution Colleague',
      placeholder: 'Enter name of colleague',
    },
    {
      name: 'image',
      type: 'file',
      label: 'Attachment (Image/File)',
      icon: CloudUpload,
      subLabel: 'Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)',
    },
    {
      name: 'reasonforLeave',
      type: 'textarea',
      label: 'Reason for Leave',
      placeholder: 'Explain the reason for request',
      isRequired: true,
      subLabel: 'Maximum 100 words',
      validation: {
        required: true,
        max: 100,
      },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'employeeName' },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'startDate' },
          { type: 'field', name: 'endDate' },
        ],
      },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'leaveType' },
          { type: 'field', name: 'durationType' },
        ],
      },

      { type: 'field', name: 'substitutionColleague' },
      { type: 'field', name: 'image' },
      { type: 'field', name: 'reasonforLeave' },
    ],
  },
};
interface AddLeaveRequestFormProps {
  onSuccess?: () => void;
}

export function AddLeaveRequestFormByAdmin({
  onSuccess,
}: AddLeaveRequestFormProps = {}) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Leave request created',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addLeaveRequestFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
