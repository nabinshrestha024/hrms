import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useWorkTypes,
  type WorkType as WorkTypeRecord,
} from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { MasterSetupBody } from '../body';
import { WorkTable } from './table/work-type-table';
import { AddWorkTypeForm } from './add-work-type-form';

export const WorkType = () => {
  const { data: response } = useWorkTypes({ pageSize: 100 });
  const data: WorkTypeRecord[] = response?.data ?? [];

  return (
    <ListPage<WorkTypeRecord>
      title="Work Type"
      search
      data={data}
      filterFn={(rows, { search }) =>
        rows.filter((row) =>
          row.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      actionComponent={
        <Can action="create" subject={PERM_SUBJECTS.MASTER_WORK_TYPES}>
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
        </Can>
      }
      renderTable={(rows) => (
        <MasterSetupBody component={<WorkTable data={rows} />} />
      )}
    />
  );
};
