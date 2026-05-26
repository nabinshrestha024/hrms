import { Can, PERM_SUBJECTS } from '@erp/auth';
import { DocumentReview, useUpdateDocumentReview } from '@erp/data-access';
import { Badge, Button, FormDialog, toast } from '@erp/ui';
import { Check, X } from 'lucide-react';
import { RejectionForm } from './rejection-form';

export const ReviewActions = ({ document }: { document: DocumentReview }) => {
  const updateReview = useUpdateDocumentReview(document.id);

  if (document.status === 'accepted') {
    return <Badge variant="secondary">Approved</Badge>;
  }
  if (document.status === 'rejected') {
    return <Badge variant="destructive">Rejected</Badge>;
  }

  const onApprove = () => {
    updateReview.mutate(
      { status: 'accepted' },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Document approved' });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Failed to approve document',
          });
        },
      }
    );
  };

  return (
    <div className="flex gap-2 lg:gap-4">
      <Can action="approve" subject={PERM_SUBJECTS.DOCUMENTS_REVIEWS}>
        <Button
          type="button"
          variant="primary"
          className="flex gap-2 items-center"
          onClick={onApprove}
        >
          <Check /> Approve
        </Button>
      </Can>

      <Can action="reject" subject={PERM_SUBJECTS.DOCUMENTS_REVIEWS}>
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="destructive"
              className="flex items-center gap-2 bg-destructive"
            >
              <X /> Reject
            </Button>
          }
          title="Rejection Message"
          size="lg"
          formId="rejection-form"
          okText="Send Rejection"
          cancelText="Cancel"
          componentClassName="border-none shadow-none p-0 rounded-none bg-background"
          dialogClassName="sm:max-w-[465px]"
        >
          {({ close }: { close: () => void }) => (
            <RejectionForm
              document={document}
              documentId={document.id}
              onSuccess={close}
            />
          )}
        </FormDialog>
      </Can>
    </div>
  );
};
