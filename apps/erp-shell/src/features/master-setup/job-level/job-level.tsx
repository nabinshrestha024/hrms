import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { MasterSetupBody } from '../body';
import { AddJobLevelForm } from './job-level-form';
import { jobLevelData } from '../schema/JobLevelData';
import { JobLevelTable } from './table/job-level-table';

export const JobLevel = () => {
  return (
    <DocumentHeader
      title="Job Levels"
      isSearch={true}
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
      renderTable={(filteredData) => (
        <MasterSetupBody component={<JobLevelTable data={filteredData} />} />
      )}
    />
  );
};
