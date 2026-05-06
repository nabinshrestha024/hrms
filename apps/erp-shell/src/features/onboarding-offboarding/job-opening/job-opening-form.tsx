import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast, useDialogClose } from '@erp/ui';

export const addJobOpeningFormConfig: FormViewConfig = {
  entity: 'job-opening-form',
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Job Title',
      placeholder: 'e.g., Software Engineer',
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
      name: 'experience',
      type: 'text',
      label: 'Experience (Years)',
      placeholder: '3-5',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'employementType',
      type: 'select',
      label: 'Employement Type',
      isRequired: true,
      options: ['Full time', 'Half time'],
      validation: { required: true },
    },
    {
      name: 'location',
      type: 'select',
      label: 'Location',
      placeholder: 'Remote',
      options: ['Remote', 'Onsite'],
      isRequired: true,
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'jobTitle' },

      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'department' },

          { type: 'field', name: 'experience' },
        ],
      },
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'employementType' },
          { type: 'field', name: 'location' },
        ],
      },
    ],
  },
};

export function JobOpeningForm() {
  //   const createJobOpening = useCreateJobOpening();
  const close = useDialogClose();
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Created Job Openings Data: ', data);
    toast({ variant: 'success', title: 'Job Opening added successfully' });
    close();
  };

  return (
    <FormRenderer
      config={addJobOpeningFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Job Opening"
      isDialogForm={true}
    />
  );
}
