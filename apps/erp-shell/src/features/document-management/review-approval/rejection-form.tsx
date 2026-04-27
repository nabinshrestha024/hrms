import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useUpdateDocumentReview } from '@erp/data-access';
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
  documentId?: string;
  onSuccess?: () => void;
}
export function RejectionForm({
  documentId,
  onSuccess,
}: rejectionFormProps = {}) {
  const updateReview = useUpdateDocumentReview(documentId ?? '');

  const onsubmit = (data: Record<string, unknown>) => {
    if (!documentId) {
      toast({
        variant: 'destructive',
        title: 'Missing document context',
      });
      return;
    }

    updateReview.mutate(
      {
        status: 'rejected',
        rejectedReason: String(data.rejectionReason ?? ''),
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Rejection message sent' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to send rejection' });
        },
      }
    );
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
