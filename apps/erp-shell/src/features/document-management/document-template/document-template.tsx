import { useState } from 'react';
import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteDocumentTemplate,
  useDocumentTemplates,
  type DocumentTemplate as DocumentTemplateRecord,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { ChevronLeft } from 'lucide-react';

import { DocumentTemplateCard } from './document-template-card';
import { DocumentTemplateForm } from './document-template-form';
import { CreateTemplateForm } from './create-document-form';
import { EditDocumentFileForm } from './edit-document-file-form';
import { EditTemplateForm } from './edit-document-template-form';

export const DocumentTemplate = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [editTarget, setEditTarget] = useState<DocumentTemplateRecord | null>(
    null
  );

  const [deleteTarget, setDeleteTarget] =
    useState<DocumentTemplateRecord | null>(null);

  const { data: response } = useDocumentTemplates({
    pageSize: 100,
  });

  const data: DocumentTemplateRecord[] = response?.data ?? [];

  const deleteDocumentTemplate = useDeleteDocumentTemplate();

  const handleEdit = (documentTemplate: DocumentTemplateRecord) => {
    setEditTarget(documentTemplate);
  };

  const handleDelete = (id: string) => {
    const documentTemplate = data.find((item) => item.id === id);

    if (documentTemplate) {
      setDeleteTarget(documentTemplate);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    await deleteDocumentTemplate.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Document template deleted successfully',
        });

        setDeleteTarget(null);
      },

      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to delete document template',
        });
      },
    });
  };

  return (
    <>
      <ListPage
        title="Document Template"
        search
        data={data}
        filterFn={(data, { search }) => {
          return data.filter((item: DocumentTemplateRecord) => {
            return item.name?.toLowerCase().includes(search.toLowerCase());
          });
        }}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.DOCUMENTS_TEMPLATES}>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
              onClick={() => setOpenUpload(true)}
            >
              Create Document
            </Button>
          </Can>
        }
        renderCard={(filtered) => (
          <DocumentTemplateCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />

      <ControlledFormDialog
        open={openUpload}
        onOpenChange={setOpenUpload}
        title="Create Document"
        size="lg"
        formId="document-template-form"
        okText="Confirm Upload"
        cancelText="Cancel"
      >
        <DocumentTemplateForm
          onCreateTemplate={() => {
            setOpenUpload(false);
            setOpenCreate(true);
          }}
        />
      </ControlledFormDialog>

      <ControlledFormDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        title={
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => {
              setOpenCreate(false);
              setOpenUpload(true);
            }}
          >
            <ChevronLeft className="h-4 w-4 text-secondary-foreground" />
            <span className="text-[16px] font-medium leading-6 text-secondary-foreground">
              Back
            </span>
          </div>
        }
        size="lg"
        formId="create-template-form"
        okText="Save to Library"
        cancelText="Cancel"
        dialogClassName="sm:max-w-[630px]"
      >
        <CreateTemplateForm />
      </ControlledFormDialog>

      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditTarget(null);
          }
        }}
        title="Edit File Details"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
        dialogClassName="sm:max-w-[630px]"
      >
        {editTarget ? (
          editTarget.kind === 'file' ? (
            <EditDocumentFileForm selectedFile={editTarget} />
          ) : (
            <EditTemplateForm selectedDocument={editTarget} />
          )
        ) : null}
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        description="Are you sure you want to delete this document?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
