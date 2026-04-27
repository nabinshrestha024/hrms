import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

// Field names align with the canonical `leavePayTypeSchema`
// (`@erp/data-access`): `name`, `code`, optional `description`. Phase 3.2
// will replace the placeholder submit handler with
// `useCreateLeavePayType().mutate()`.
export const addLeaveTypeFormConfig: FormViewConfig = {
  entity: 'leave-pay-type',

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Leave Type Name',
      placeholder: 'Fully Paid',
      isRequired: true,
      validation: { required: true, max: 100 },
    },
    {
      name: 'code',
      type: 'text',
      label: 'Leave Code',
      placeholder: 'FP',
      subLabel: 'Two to six uppercase letters',
      isRequired: true,
      validation: {
        required: true,
        pattern: '^[A-Z]{2,6}$',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      subLabel: 'Optional, less than 500 characters',
      validation: { max: 500 },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'name' },
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
    // Phase 3.2 will replace this with useCreateLeavePayType().mutate(...).
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Leave type added',
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
