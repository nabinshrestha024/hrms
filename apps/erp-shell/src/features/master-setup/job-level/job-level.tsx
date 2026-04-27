import { Button, FormDialog, ListPage } from '@erp/ui';
import { MasterSetupBody } from '../body';
import { AddJobLevelForm } from './job-level-form';
import { jobLevelData } from '../schema/JobLevelData';
import { JobLevelTable } from './table/job-level-table';

export const JobLevel = () => {
  return (
    <ListPage
      title="Job Levels"
      search
      data={jobLevelData}
      actionComponent={
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
      }
      renderTable={(rows) => (
        <MasterSetupBody component={<JobLevelTable data={rows} />} />
      )}
    />
  );
};
