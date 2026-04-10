import { personalDocumentData } from '../Schema/DocumentData';
import { DocumentUpload } from './document/document-upload';

type ModalSize = 'sm' | 'md' | 'lg';

interface GetColumnsProps {
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

export const Document = ({ onOpen }: GetColumnsProps) => {
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="flex justify-between items-center">
          <div className="text-[18px] font-medium leading-7 text-[#09090B]">
            Document
          </div>
        </div>
        <DocumentUpload
          title="Personal Documents"
          subTitle="Uploaded by Employee"
          activeButton={false}
          documents={personalDocumentData}
          onOpen={onOpen}
          uploadComponent={true}
          viewComponent={false}
        />

        <DocumentUpload
          title="HR & Company Documents"
          subTitle="Uploaded by HR Admin"
          activeButton={true}
          primaryButton="Assign Document"
          secondaryButton="Upload Document"
          documents={personalDocumentData}
          onOpen={onOpen}
          viewComponent={true}
          uploadComponent={false}
        />
      </div>
    </>
  );
};
