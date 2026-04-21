import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addLeaveTypeFormConfig: FormViewConfig = {
  entity: 'leaveType',

  fields: [
    {
      name: 'leaveType',
      type: 'text',
      label: 'Leave Type Name',
      placeholder: 'Intern',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'code',
      type: 'text',
      label: 'Leave Code',
      placeholder: 'FP',
      isRequired: true,
      validation: {
        required: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      isRequired: true,
      subLabel: 'Less than 200 words',
      validation: {
        required: true,
        max: 200,
      },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'leaveType' },
      { type: 'field', name: 'code' },
      { type: 'field', name: 'description' },
    ],
  },
};

interface AddLeaveTypeFormProps {
  onSuccess?: () => void;
}

export function AddLeaveTypeForm({ onSuccess }: AddLeaveTypeFormProps) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Leave Type Added',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addLeaveTypeFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Leave Type"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
    />
  );
}
