import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useCreateLeavePayType } from '@erp/data-access';
import { toast } from '@erp/ui';

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
  const createLeavePayType = useCreateLeavePayType();

  const onsubmit = (data: Record<string, unknown>) => {
    createLeavePayType.mutate(
      {
        name: String(data.name ?? ''),
        code: String(data.code ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Leave type added' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to add leave type' });
        },
      }
    );
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
