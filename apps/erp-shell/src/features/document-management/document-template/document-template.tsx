import { useState } from 'react';
import {
  useDocumentTemplates,
  type DocumentTemplate as DocumentTemplateRecord,
} from '@erp/data-access';
import { Button, ControlledFormDialog } from '@erp/ui';
import { PageHeader } from '../../../components/page-header';
import { DocumentTemplateCard } from './document-template-card';
import { DocumentTemplateForm } from './document-template-form';
import { CreateTemplateForm } from './create-document-form';
import { ChevronLeft } from 'lucide-react';

export const DocumentTemplate = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const { data: response } = useDocumentTemplates({ pageSize: 100 });
  const data: DocumentTemplateRecord[] = response?.data ?? [];

  return (
    <>
      <PageHeader
        title="Document Template"
        isSearch={true}
        isTabs={false}
        data={data}
        actionComponent={
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="text-[14px] font-medium leading-5 text-white"
            onClick={() => setOpenUpload(true)}
          >
            Create Document
          </Button>
        }
        renderCard={(filtered) => <DocumentTemplateCard data={filtered} />}
        renderTable={(filtered) => <></>}
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
            className="flex items-center gap-2 cursor-pointer "
            onClick={() => {
              setOpenCreate(false);
              setOpenUpload(true);
            }}
          >
            <ChevronLeft className="text-secondary-foreground w-4 h-4" />
            <span className="text-[16px] text-secondary-foreground font-medium leading-6">
              Back
            </span>
          </div>
        }
        size="lg"
        formId="create-template-form"
        okText="Save to Library"
        cancelText="Cancel"
      >
        <CreateTemplateForm />
      </ControlledFormDialog>
    </>
  );
};
