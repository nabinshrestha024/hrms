import { Button, FormDialog } from '@erp/ui';
import { PageHeader } from '../../../components/page-header';
import { DocumentTemplateCard } from './document-template-card';
import { DocumentTemplateForm } from './document-template-form';
import { documentTemplateData } from '../schema/DocumentTemplateData';

export const DocumentTemplate = () => {
  return (
    <>
      <PageHeader
        title="Document Template"
        isSearch={true}
        isTabs={false}
        data={documentTemplateData}
        actionComponent={
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Create Document
              </Button>
            }
            title="Create Document"
            size="lg"
            formId="document-template-form"
            okText="Confirm Upload"
            cancelText="Cancel"
          >
            {({ close }: { close: () => void }) => (
              <DocumentTemplateForm onSuccess={close} />
            )}
          </FormDialog>
        }
        renderCard={(filtered) => <DocumentTemplateCard data={filtered} />}
        renderTable={(filtered) => <></>}
      />
    </>
  );
};
