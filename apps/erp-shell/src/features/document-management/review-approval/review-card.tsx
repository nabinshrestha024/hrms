import { type DocumentReview } from '@erp/data-access';
import { FormDialog, HRCard } from '@erp/ui';
import { CalendarDays, Download, Eye, File, FileInput } from 'lucide-react';
import { IconButton } from '../../../components/icon-button';
import { ViewDocument } from './view-document';
import { ReviewActions } from './review-action';

interface ReviewApprovalCardProps {
  data: DocumentReview[];
}

export const ReviewApprovalCard = ({ data }: ReviewApprovalCardProps) => {
  return (
    <div className="px-3 lg:px-6">
      <HRCard
        cardClassName="p-3 lg:p-6 border-none rounded-xl shadow-none bg-white"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        {data.map((items) => {
          const handleDownload = async () => {
            try {
              const response = await fetch(items.file);
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = items.fileName || 'document';
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(url);
            } catch (error) {
              console.error('Download failed', error);
            }
          };
          return (
            <HRCard
              cardClassName="border border-border rounded-xl p-3 lg:p-6 shadow-none bg-white"
              cardContentClassName="p-0 flex flex-col gap-1 md:gap-0 md:flex-row md:justify-between md:items-center"
              key={items.id}
            >
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
                        <div
                          className="flex gap-2 items-center"
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 text-white" />
                          Download
                        </div>
                      }
                      componentClassName="border-none shadow-none p-0 rounded-none bg-background"
                      dialogClassName="sm:max-w-[563px]"
                    >
                      <ViewDocument id={items.employeeId} />
                    </FormDialog>
                  </div>
                  <div className="text-[12px] font-normal leading-4 flex gap-1">
                    <span>Uploaded by</span>

                    <span className="font-semibold">{items.uploadedBy}</span>
                  </div>
                </div>

                <div className="flex gap-2 text-secondary-foreground text-[12px] font-normal items-center">
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
                  <div className="text-[12px] text-destructive mt-3">
                    <span className="font-semibold mr-0.5">
                      Rejection Reason:
                    </span>
                    <span className="font-normal">{items.rejectedReason}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-start">
                <ReviewActions document={items} />
              </div>
            </HRCard>
          );
        })}
      </HRCard>
    </div>
  );
};
