import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { RequestApprover } from './request-approver';

export const addTimeRequestFormConfig: FormViewConfig = {
  entity: 'add-time-request',

  fields: [
    {
      name: 'date',
      type: 'date',
      label: 'Start Date',
      isRequired: true,
      validation: { required: true },
    },

    {
      name: 'checkIn',
      type: 'time',
      label: 'Revised Check-In',
      isRequired: true,
      validation: { required: true },
    },

    {
      name: 'checkOut',
      type: 'time',
      label: 'Revised Check-Out',
      isRequired: true,
      validation: { required: true },
    },

    {
      name: 'reasonforCheckIn',
      type: 'textarea',
      label: 'Reason for Check-In Correction',
      placeholder: 'e.g biometric failure',
      isRequired: true,
      validation: {
        required: true,
        max: 100,
      },
    },

    {
      name: 'reasonforCheckout',
      type: 'textarea',
      label: 'Reason for Check-Out Correction',
      placeholder: 'e.g biometric failure',
      isRequired: true,
      validation: {
        required: true,
        max: 100,
      },
    },
  ],

  layout: {
    type: 'section',
    footer: <RequestApprover />,
    children: [
      { type: 'field', name: 'date' },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'checkIn' },
          { type: 'field', name: 'checkOut' },
        ],
      },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'reasonforCheckIn' },
          { type: 'field', name: 'reasonforCheckout' },
        ],
      },
    ],
  },
};
export function AddTimeRequestForm({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Time request submitted',
    });

    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addTimeRequestFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      isDialogForm={true}
    />
  );
}
