import {
  CalendarDays,
  Check,
  Download,
  Eye,
  File,
  FileInput,
  X,
} from 'lucide-react';
import { ReviewApprovalType } from '../schema/ReviewApprovalData';
import { Badge, Button, FormDialog, HRCard } from '@erp/ui';
import { IconButton } from '../../../components/icon-button';
import { RejectionForm } from './rejection-form';
import { ViewDocument } from './view-document';

interface ReviewApprovalCardProps {
  data: ReviewApprovalType[];
}
export const ReviewApprovalCard = ({ data }: ReviewApprovalCardProps) => {
  return (
    <div className="px-6">
      <HRCard
        cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        {data.map((items, index) => (
          <div className="border border-border rounded-xl p-6" key={index}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center  ">
                    <span className="text-[12px] font-semibold leading-4">
                      {items.fileName}
                    </span>
                    <FormDialog
                      trigger={
                        <IconButton
                          variant="default"
                          onClick={() => console.warn('clicked')}
                        >
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
                      {({ close }: { close: () => void }) => (
                        <ViewDocument id={items.employeeId} />
                      )}
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
                {items.status === 'Rejected' && (
                  <div className="text-[12px] text-[#E7000B] mt-3">
                    <span className="font-semibold mr-0.5">
                      Rejection Reason:
                    </span>
                    <span className="font-normal">{items.rejectedReason}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 ">
                {items.status === 'Pending' ? (
                  <>
                    <Button
                      type="button"
                      variant="primary"
                      className="flex gap-2 items-center"
                    >
                      <Check /> Approve
                    </Button>

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
                      {({ close }: { close: () => void }) => <RejectionForm />}
                    </FormDialog>
                  </>
                ) : items.status === 'Accepted' ? (
                  <Badge variant="secondary">Approved</Badge>
                ) : (
                  <Badge variant="destructive">Rejected</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </HRCard>
    </div>
  );
};
