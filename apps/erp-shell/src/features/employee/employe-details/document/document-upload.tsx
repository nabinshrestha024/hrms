import { Dot, Eye, LucideIcon, Trash2, Upload } from 'lucide-react';
import { AssignDocumentForm } from './assign-document-form';
import { UploadDocumentForm } from './upload-document-form';
import { Button, HRCard } from '@erp/ui';
import { FileUpload } from '../../../../components/file-upload';
import { IconButton } from '../../../../components/icon-button';
import { useNavigate } from '@tanstack/react-router';

type ModalSize = 'sm' | 'md' | 'lg';

interface Document {
  title: string;
  subTitle: string;
  icon: LucideIcon;
  templateName: string;
}

interface DocumentUploadProps {
  title: string;
  subTitle: string;
  activeButton: boolean;
  primaryButton?: string;
  secondaryButton?: string;
  uploadComponent: boolean;
  viewComponent: boolean;

  documents: Document[];
  onOpen: <T extends string>(config: {
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    dialogClassName?: string;
    onCancel?: () => void;
  }) => void;
}

export const DocumentUpload = ({
  title,
  subTitle,
  primaryButton,
  secondaryButton,
  activeButton,
  documents,
  viewComponent,
  uploadComponent,
  onOpen,
}: DocumentUploadProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[16px] text-foreground font-medium leading-6">
            {title}
          </span>
          <span className="text-[14px] text-secondary-foreground font-normal leading-5">
            {subTitle}
          </span>
        </div>

        {activeButton && (
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary text-[14px] font-medium leading-5 cursor-pointer"
              onClick={() =>
                onOpen({
                  modalTitle: 'Assign Document',
                  title: 'Assign Document',
                  okText: 'Add',
                  size: 'lg',
                  cancelText: 'Cancel',
                  formId: 'assign',
                  component: <AssignDocumentForm />,
                })
              }
            >
              {primaryButton}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="text-[#FAFAFA] text-[14px] font-medium leading-5 cursor-pointer"
              onClick={() =>
                onOpen({
                  modalTitle: 'Upload Document',
                  title: 'Upload Document',
                  okText: 'Add',
                  size: 'lg',
                  cancelText: 'Cancel',
                  formId: 'upload',
                  dialogClassName: 'max-h-[100vh]',
                  component: <UploadDocumentForm />,
                })
              }
            >
              {secondaryButton}
            </Button>
          </div>
        )}
      </div>

      {uploadComponent && (
        <div className="grid grid-cols-3 gap-6">
          {documents.map((val) => (
            <FileUpload
              key={val.title}
              isRequired={true}
              className="relative border border-[#E4E4E7] rounded-[12px] p-4 cursor-pointer flex justify-between"
              cardClassName="flex gap-2 items-center"
              titleClassName="flex flex-col gap-1"
              iconClassName=" w-8 h-8 flex items-center justify-center bg-[#F4F4F5] rounded-sm"
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
        <div className="grid grid-cols-3 gap-6">
          {documents.map((val) => {
            const Icon = val.icon;

            return (
              <HRCard
                key={val.title}
                cardClassName="relative border border-[#E4E4E7] rounded-[12px] p-4 cursor-pointer flex justify-between"
                cardContentClassName="flex justify-between p-0"
              >
                <div className="flex gap-2 items-center p-0">
                  <IconButton variant="default">
                    <Icon className="w-4 h-4" />
                  </IconButton>

                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] text-foreground leading-6 font-medium">
                      {val.title}
                    </span>
                    <span className="flex gap-0.5 text-[14px] text-secondary-foreground leading-5 font-medium">
                      {val.subTitle}{' '}
                      <Dot className="w-4 h-4 text-secondary-foreground" />{' '}
                      {val.templateName}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Trash2 className="w-4 h-4 text-badge-text-3" />
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
