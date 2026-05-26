import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { DocumentReview, useUpdateDocumentReview } from '@erp/data-access';
import { toast } from '@erp/ui';
import { UserCard } from '../../../components/user-card';

export const addRejectionFormConfig = ({
  document,
}: {
  document: DocumentReview;
}): FormViewConfig => ({
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

    header: 'Send Rejection Reason To:',

    title: (
      <UserCard
        employeeName={document.employeeName ?? ''}
        employeeId={document.employeeId ?? ''}
        department={document.employeeDepartment ?? ''}
      />
    ),

    children: [
      { type: 'field', name: 'documentName' },
      { type: 'field', name: 'rejectionReason' },
    ],
  },
});

interface RejectionFormProps {
  documentId?: string;
  document: DocumentReview;
  onSuccess?: () => void;
}

export function RejectionForm({
  document,
  documentId,
  onSuccess,
}: RejectionFormProps) {
  const updateReview = useUpdateDocumentReview(documentId ?? '');

  const onSubmit = (data: Record<string, unknown>) => {
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
          toast({
            variant: 'success',
            title: 'Rejection message sent',
          });

          onSuccess?.();
        },

        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to send rejection',
          });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={addRejectionFormConfig({
        document,
      })}
      onSubmit={onSubmit}
      submitLabel="Add Rejection"
      isDialogForm={true}
      fieldsetClassName="border border-border p-4 bg-white"
    />
  );
}
