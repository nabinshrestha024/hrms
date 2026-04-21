import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { MasterSetupBody } from '../body';
import { workTypeData } from '../schema/WorkTypeData';
import { WorkTable } from './table/work-type-table';
import { AddWorkTypeForm } from './add-work-type-form';

export const WorkType = () => {
  return (
    <DocumentHeader
      title="Work Type"
      isSearch={true}
      data={workTypeData}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Add Work Type
            </Button>
          }
          title="Add New Work Type"
          size="lg"
          formId="WorkType-form"
          okText="Add"
          cancelText="Cancel"
        >
          {({ close }: { close: () => void }) => (
            <AddWorkTypeForm onSuccess={close} />
          )}
        </FormDialog>
      }
      renderTable={(filteredData) => (
        <MasterSetupBody component={<WorkTable data={filteredData} />} />
      )}
    />
  );
};
