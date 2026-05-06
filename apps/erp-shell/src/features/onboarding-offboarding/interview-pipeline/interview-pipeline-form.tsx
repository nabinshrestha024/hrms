import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast, useDialogClose } from '@erp/ui';

export const addInterviewPipelineFormConfig: FormViewConfig = {
  entity: 'interview-pipeline-form',
  fields: [
    {
      name: 'processType',
      type: 'select',
      label: 'Process Type',
      options: ['Onboarding', 'Offboarding'],
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'employeeName',
      type: 'text',
      label: 'Employee Name',
      placeholder: 'Enter name',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position',
      placeholder: 'e.g. Senior Developer',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      isRequired: true,
      options: ['Engineering', 'Design', 'Marketing'],
      validation: { required: true },
    },

    {
      name: 'mentor',
      type: 'text',
      label: 'Mentor',
      isRequired: true,
      placeholder: 'Enter mentor',
      validation: { required: true },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      placeholder: 'mm/dd/yyy',
      isRequired: true,
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'processType' },
      { type: 'field', name: 'employeeName' },
      { type: 'field', name: 'position' },
      { type: 'field', name: 'department' },
      { type: 'field', name: 'mentor' },
      { type: 'field', name: 'startDate' },
    ],
  },
};

export function InterviewPipelineForm() {
  //   const createInterviewPipeline = useCreateInterviewPipeline();
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Created Interview Pipelines Data: ', data);
    toast({
      variant: 'success',
      title: 'Interview Pipeline added successfully',
    });
    close();
  };

  return (
    <FormRenderer
      config={addInterviewPipelineFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Interview Pipeline"
      isDialogForm={true}
    />
  );
}
