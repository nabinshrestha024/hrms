import { Button, FormDialog, ListPage } from '@erp/ui';
import { jobOpeningData } from '../schema/JobOpeningData';
import { JobOpeningCard } from './job-opening-card';
import { JobOpeningForm } from './job-opening-form';

export const JobOpening = () => {
  return (
    <ListPage
      title="Job Opening"
      data={jobOpeningData}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Post New Job
            </Button>
          }
          title="Post New Requisition"
          size="lg"
          okText="Post"
          cancelText="Cancel"
          formId="job-opening-form"
        >
          <JobOpeningForm />
        </FormDialog>
      }
      renderCard={() => <JobOpeningCard />}
    />
  );
};
