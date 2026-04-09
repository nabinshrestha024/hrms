import { LucideIcon, Upload } from 'lucide-react';
import { AssignDocumentForm } from './assign-document-form';
import { UploadDocumentForm } from './upload-document-form';
import { Button } from '@erp/ui';
import { FileUpload } from '../../../../components/file-upload';

type ModalSize = 'sm' | 'md' | 'lg';

interface Document {
  title: string;
  subTitle: string;
  icon: LucideIcon;
}

interface DocumentUploadProps {
  title: string;
  subTitle: string;
  activeButton: boolean;
  primaryButton?: string;
  secondaryButton?: string;
  uploadIcon?: LucideIcon;
  documents: Document[];
  onOpen: <T extends string>(config: {
    title: T;
    modalTitle: string | null;
    okText: React.ReactNode;
    component: React.ReactNode;
    cancelText?: string | React.ReactNode;
    size?: ModalSize;
    formId?: string;
    onCancel?: () => void;
  }) => void;
}

export const DocumentUpload = ({
  title,
  subTitle,
  primaryButton,
  secondaryButton,
  activeButton,
  uploadIcon,
  documents,
  onOpen,
}: DocumentUploadProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 items-center">
          <span className="text-[16px] text-[#09090B] font-medium leading-6">
            {title}
          </span>
          <span className="text-[14px] text-[#71717A] font-normal leading-5">
            {subTitle}
          </span>
        </div>

        {activeButton && (
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-[#4F39F6] text-[#4F39F6] text-[14px] font-medium leading-5"
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
              className="text-[#FAFAFA] text-[14px] font-medium leading-5"
              onClick={() =>
                onOpen({
                  modalTitle: 'Upload Document',
                  title: 'Upload Document',
                  okText: 'Add',
                  size: 'lg',
                  cancelText: 'Cancel',
                  formId: 'upload',
                  component: <UploadDocumentForm />,
                })
              }
            >
              {secondaryButton}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {documents.map((val) => (
          <FileUpload
            key={val.title}
            isRequired={true}
            className="border border-[#E4E4E7] rounded-[12px] p-4 cursor-pointer flex justify-between"
            cardClassName="flex gap-2 items-center"
            titleClassName="flex flex-col gap-1"
            iconClassName="w-8 h-8 flex items-center justify-center bg-[#F4F4F5] rounded-sm"
            icon={val.icon}
            label={val.title}
            subLable={val.subTitle}
            buttonClassName="p-0 bg-none rounded-none text-[14px]"
            browseText={<Upload className="text-[16px]" />}
            drag
          />
        ))}
      </div>
    </div>
  );
};
