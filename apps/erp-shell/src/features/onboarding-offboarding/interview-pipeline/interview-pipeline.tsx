import { Button, FormDialog, ListPage } from '@erp/ui';
import { InterviewPipelineCard } from './interview-pipeline-card';
import { InterviewPipelineForm } from './interview-pipeline-form';

export const InterviewPipeline = () => {
  return (
    <ListPage
      title="Interview Pipeline"
      data={[]}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              New Process
            </Button>
          }
          title="New Process"
          size="lg"
          okText="Create"
          cancelText="Cancel"
          formId="interview-pipeline-form"
        >
          <InterviewPipelineForm />
        </FormDialog>
      }
      renderCard={() => <InterviewPipelineCard />}
    />
  );
};
