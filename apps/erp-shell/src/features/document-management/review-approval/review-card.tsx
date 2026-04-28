import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useUpdateDocumentReview, type DocumentReview } from '@erp/data-access';
import { Badge, Button, FormDialog, HRCard, toast } from '@erp/ui';
import {
  CalendarDays,
  Check,
  Download,
  Eye,
  File,
  FileInput,
  X,
} from 'lucide-react';
import { IconButton } from '../../../components/icon-button';
import { RejectionForm } from './rejection-form';
import { ViewDocument } from './view-document';

interface ReviewApprovalCardProps {
  data: DocumentReview[];
}

export const ReviewApprovalCard = ({ data }: ReviewApprovalCardProps) => {
  return (
    <div className="px-6">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        {data.map((items) => (
          <div className="border border-border rounded-xl p-6" key={items.id}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center  ">
                    <span className="text-[12px] font-semibold leading-4">
                      {items.fileName}
                    </span>
                    <FormDialog
                      trigger={
                        <IconButton variant="default">
                          <Eye className="w-4 h-4" />
                        </IconButton>
                      }
                      title={items.fileName}
                      size="lg"
                      okText={
                        <div className="flex gap-2 items-center">
                          <Download className="w-4 h-4 text-white" />
                          Download
                        </div>
                      }
                      componentClassName="border-none shadow-none p-0 rounded-none bg-background"
                      dialogClassName="sm:max-w-[465px]"
                    >
                      <ViewDocument id={items.employeeId} />
                    </FormDialog>
                  </div>
                  <div className="text-[12px] font-normal leading-4 flex gap-1">
                    <span>Uploaded by</span>

                    <span className="font-semibold">{items.uploadedBy}</span>
                  </div>
                </div>

                <div className="flex gap-2 text-[#71717A] text-[12px] font-normal items-center">
                  <div className="flex gap-1 items-center">
                    <FileInput className="w-4 h-4 " /> {items.type}
                  </div>
                  <div className="flex gap-1 items-center">
                    <CalendarDays className="w-4 h-4 " /> {items.date}
                  </div>
                  <div className="flex gap-1 items-center">
                    <File className="w-4 h-4 " /> {items.size}
                  </div>
                </div>
                {items.status === 'rejected' && (
                  <div className="text-[12px] text-[#E7000B] mt-3">
                    <span className="font-semibold mr-0.5">
                      Rejection Reason:
                    </span>
                    <span className="font-normal">{items.rejectedReason}</span>
                  </div>
                )}
              </div>

              <ReviewActions document={items} />
            </div>
          </div>
        ))}
      </HRCard>
    </div>
  );
};

const ReviewActions = ({ document }: { document: DocumentReview }) => {
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
    <div className="flex gap-4">
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
              className="flex items-center gap-2 bg-[#E7000B]"
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
            <RejectionForm documentId={document.id} onSuccess={close} />
          )}
        </FormDialog>
      </Can>
    </div>
  );
};
