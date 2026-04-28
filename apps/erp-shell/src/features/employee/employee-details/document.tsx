import { personalDocumentData } from '../schema/document-data';
import { DocumentUpload } from './document/document-upload';

export const Document = () => {
  return (
    <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
      <div className="flex justify-between items-center">
        <div className="text-[18px] font-medium leading-7 text-foreground">
          Document
        </div>
      </div>
      <DocumentUpload
        title="Personal Documents"
        subTitle="Uploaded by Employee"
        activeButton={false}
        documents={personalDocumentData}
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
        viewComponent={true}
        isDelete={true}
        uploadComponent={false}
      />
    </div>
  );
};
