import { Button, FormDialog, HRCard } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import { Dot, Eye, Trash2, Upload } from 'lucide-react';
import { FileUpload } from '../../../../components/file-upload';
import { IconButton } from '../../../../components/icon-button';
import { AssignDocumentForm } from './assign-document-form';
import { UploadDocumentForm } from './upload-document-form';
import { Document } from '../../schema/document-data';

interface DocumentUploadProps {
  title: string;
  subTitle: string;
  activeButton: boolean;
  primaryButton?: string;
  secondaryButton?: string;
  uploadComponent: boolean;
  viewComponent: boolean;
  isDelete?: boolean;
  documents: Document[];
  onDelete?: (id: number) => void;
}

export const DocumentUpload = ({
  title,
  subTitle,
  isDelete,
  primaryButton,
  secondaryButton,
  activeButton,
  documents,
  viewComponent,
  uploadComponent,
  onDelete,
}: DocumentUploadProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-2 ">
          <span className="text-[16px] text-foreground font-medium leading-6">
            {title}
          </span>
          <span className="text-[14px] text-secondary-foreground font-normal leading-5">
            {subTitle}
          </span>
        </div>

        {activeButton && (
          <div className="flex gap-2 md:gap-4 ">
            <FormDialog
              trigger={
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary text-primary text-[14px] font-medium leading-5 cursor-pointer"
                >
                  {primaryButton}
                </Button>
              }
              title="Assign Document"
              size="lg"
              formId="assign-document-form"
              okText="Add"
            >
              {({ close }: { close: () => void }) => (
                <AssignDocumentForm onSuccess={close} />
              )}
            </FormDialog>

            <FormDialog
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  className="text-card text-[14px] font-medium leading-5 cursor-pointer"
                >
                  {secondaryButton}
                </Button>
              }
              title="Upload Document"
              size="lg"
              formId="upload-document-form"
              okText="Add"
              dialogClassName="max-h-[100vh]"
            >
              {({ close }: { close: () => void }) => (
                <UploadDocumentForm onSuccess={close} />
              )}
            </FormDialog>
          </div>
        )}
      </div>

      {uploadComponent && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((val) => (
            <FileUpload
              key={val.title}
              isRequired={true}
              className="relative border border-border rounded-[12px] p-4 cursor-pointer flex justify-between"
              cardClassName="flex gap-2 items-center"
              titleClassName="flex flex-col gap-1"
              iconClassName=" w-8 h-8 flex items-center justify-center bg-muted rounded-sm"
              iconClass="w-4 h-4"
              icon={val.icon}
              label={val.title}
              subLable={val.subTitle}
              buttonClassName="absolute top-4 right-3 p-0 bg-none rounded-none  text-secondary-foreground cursor-pointer"
              browseText={<Upload className="w-4 h-4" />}
              drag
            />
          ))}
        </div>
      )}
      {viewComponent && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((val) => {
            const Icon = val.icon;
            const id = val.id;
            return (
              <HRCard
                key={val.title}
                cardClassName="relative border border-border rounded-[12px] p-4 cursor-pointer flex justify-between"
                cardContentClassName="flex justify-between p-0"
              >
                <div className="flex gap-2 items-center p-0">
                  <IconButton variant="default">
                    <Icon className="w-4 h-4" />
                  </IconButton>
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] text-foreground leading-6 font-medium line-clamp-1">
                      {val.title}
                    </span>
                    <span className="flex gap-0.5 text-[14px] text-secondary-foreground leading-5 font-medium">
                      {val.subTitle}
                      <Dot className="w-4 h-4 text-secondary-foreground" />
                      {val.templateName}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {isDelete && (
                    <Trash2
                      className="w-4 h-4 text-badge-text-3"
                      onClick={() => onDelete?.(id)}
                    />
                  )}
                  <Eye
                    className="w-4 h-4 text-secondary-foreground"
                    onClick={() =>
                      navigate({
                        to: `/employee/document-view/${val.templateName}`,
                      })
                    }
                  />
                </div>
              </HRCard>
            );
          })}
        </div>
      )}
    </div>
  );
};
