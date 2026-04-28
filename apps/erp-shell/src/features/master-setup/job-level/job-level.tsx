import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useJobLevels, type JobLevel as JobLevelType } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { MasterSetupBody } from '../body';
import { AddJobLevelForm } from './job-level-form';
import { JobLevelTable } from './table/job-level-table';

export const JobLevel = () => {
  const { data: response } = useJobLevels({
    pageSize: 100,
    sortBy: 'rank',
    sortOrder: 'asc',
  });
  const data: JobLevelType[] = response?.data ?? [];

  return (
    <ListPage<JobLevelType>
      title="Job Levels"
      search
      data={data}
      filterFn={(rows, { search }) =>
        rows.filter((row) =>
          row.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      actionComponent={
        <Can action="create" subject={PERM_SUBJECTS.MASTER_JOB_LEVELS}>
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Job Level
              </Button>
            }
            title="Add New Job Level"
            size="lg"
            formId="job-level-form"
            okText="Add"
            cancelText="Cancel"
          >
            {({ close }: { close: () => void }) => (
              <AddJobLevelForm onSuccess={close} />
            )}
          </FormDialog>
        </Can>
      }
      renderTable={(rows) => (
        <MasterSetupBody component={<JobLevelTable data={rows} />} />
      )}
    />
  );
};
