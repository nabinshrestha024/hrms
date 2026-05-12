import { ConfirmDialog } from '@erp/ui';
import { useState } from 'react';
import { personalDocumentData } from '../schema/document-data';
import { Document, DocumentUpload } from './document/document-upload';

export const Documents = () => {
  // const deleteDocument = useDeleteEmployee();

  const [deleteTarget, setDeleteTarget] = useState<Document | null>(null);

  const handleDelete = (id: number) => {
    const document = personalDocumentData.find((b) => b.id === id);
    if (document) setDeleteTarget(document);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    // await deleteDocument.mutateAsync(deleteTarget.id, {
    //   onSuccess: () => {
    //     toast({ variant: 'success', title: 'document deleted successfully' });
    //   },
    //   onError: () => {
    //     toast({ variant: 'destructive', title: 'Failed to delete document' });
    //   },
    // });
  };
  return (
    <>
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
          onDelete={handleDelete}
        />
      </div>
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete document"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
