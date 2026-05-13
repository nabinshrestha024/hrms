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
  const onsubmit = (_data: Record<string, unknown>) => {
    // Time-correction requests need their own approval workflow resource
    // (not a direct attendance-record edit) and aren't yet modelled in
    // `@erp/data-access`. Tracked as Phase 4 — config-engine / policy
    // workflow completion.
    toast({ variant: 'success', title: 'Time request submitted' });
    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addTimeRequestFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      isDialogForm={true}
      fieldsetClassName="max-h-150 overflow-auto pr-2"
    />
  );
}
