import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const addRejectionFormConfig: FormViewConfig = {
  entity: 'rejection',
  fields: [
    {
      name: 'documentName',
      type: 'text',
      label: 'Document Name',
      placeholder: 'Tax Form W-4',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'rejectionReason',
      type: 'textarea',
      label: 'Rejection Reason',
      placeholder: 'Type here',
      subLabel: 'Less than 200 words',
      isRequired: true,
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',
    title: 'Send Rejection Reason To:',
    children: [
      { type: 'field', name: 'documentName' },
      { type: 'field', name: 'rejectionReason' },
    ],
  },
};
interface rejectionFormProps {
  onSuccess?: () => void;
}
export function RejectionForm({ onSuccess }: rejectionFormProps = {}) {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Rejection: ', data);
    toast({ variant: 'success', title: 'Rejection message send' });
    onSuccess?.();
  };

  return (
    <FormRenderer
      config={addRejectionFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Rejection"
      isDialogForm={true}
      fieldsetClassName="border border-border p-4 bg-white"
    />
  );
}
