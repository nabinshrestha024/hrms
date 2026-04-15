import { ArrowLeft, Plus } from 'lucide-react';
import { IconButton } from '../../../components/icon-button';
import { FormDialog } from '@erp/ui';
import { CreateTemplateForm } from './create-document-form';
import { DocumentTemplateForm } from './document-template-form';

export const CreateTemplateField = () => {
  return (
    <FormDialog
      trigger={
        <div className="flex gap-4 border-2 border-dashed border-muted-foreground p-4 cursor-pointer">
          <IconButton variant="primary" className="p-3 bg-[#C6D2FF] w-12 h-12">
            <Plus className="w-8 h-8 text-indigo-600" />
          </IconButton>
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium text-foreground leading-5">
              Create Template
            </span>
            <span className="text-[14px] font-normal text-foreground leading-4">
              Build a policy directly in browser
            </span>
          </div>
        </div>
      }
      title={
        <div
          className="flex gap-1 cursor-pointer items-center"
          onClick={() => <DocumentTemplateForm />}
        >
          <ArrowLeft className="w-4 h-4 text-secondary-foreground" />
          <span className="text-[14px] text-secondary-foreground font-normal leading-5">
            Back
          </span>
        </div>
      }
      size="lg"
      formId="create-template-form"
      okText="Confirm Upload"
      cancelText="Cancel"
    >
      {({ close }: { close: () => void }) => (
        <CreateTemplateForm onSuccess={close} />
      )}
    </FormDialog>
  );
};
