import { Button, FormDialog, ListPage } from '@erp/ui';
import { MasterSetupBody } from '../body';
import { workTypeData } from '../schema/WorkTypeData';
import { WorkTable } from './table/work-type-table';
import { AddWorkTypeForm } from './add-work-type-form';

export const WorkType = () => {
  return (
    <ListPage
      title="Work Type"
      search
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
      renderTable={(rows) => (
        <MasterSetupBody component={<WorkTable data={rows} />} />
      )}
    />
  );
};
