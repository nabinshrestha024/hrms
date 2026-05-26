import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import {
  LeavePayType,
  useCreateLeavePayType,
  useUpdateLeavePayType,
} from '@erp/data-access';
import { toast, useDialogClose } from '@erp/ui';

export const editLeaveTypeFormConfig: FormViewConfig = {
  entity: 'edit-leave-pay-type',

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

interface EditLeaveTypeFormProps {
  selectedLeaveType?: LeavePayType;
}

export function EditLeaveTypeForm({
  selectedLeaveType,
}: EditLeaveTypeFormProps) {
  const updateLeavePayType = useUpdateLeavePayType(selectedLeaveType?.id ?? '');
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    updateLeavePayType.mutate(
      {
        name: String(data.name ?? ''),
        code: String(data.code ?? ''),
        description: data.description ? String(data.description) : undefined,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Leave type edited' });
          close();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to edit leave type' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={editLeaveTypeFormConfig}
      onSubmit={onsubmit}
      submitLabel="Save Leave Type"
      isDialogForm={true}
      fieldsetClassName="max-h-161 overflow-auto"
      defaultValues={{
        name: selectedLeaveType?.name ?? '',
        code: selectedLeaveType?.code ?? '',
        description: selectedLeaveType?.description ?? '',
      }}
    />
  );
}
