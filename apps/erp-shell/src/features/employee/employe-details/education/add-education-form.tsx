import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const createEducationFormConfig: FormViewConfig = {
  entity: 'education',
  fields: [
    {
      name: 'qualification',
      type: 'text',
      label: 'Degree/Qualification',
      placeholder: 'e.g. Bachelor of Science',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'studyField',
      type: 'text',
      label: 'Field of Study',
      placeholder: 'e.g. Computer Science',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'university',
      type: 'text',
      label: 'Institution/University',
      placeholder: 'e.g. Global College',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'startYear',
      type: 'text',
      label: 'Start Year',
      placeholder: 'e.g. 2016',
      validation: { required: false },
    },
    {
      name: 'endYear',
      type: 'text',
      label: 'End Year',
      placeholder: 'e.g. 2020',
      validation: { required: false },
    },
    {
      name: 'grade',
      type: 'text',
      label: 'Grade/GPA',
      placeholder: 'e.g. 3.8',
      validation: { required: false },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      placeholder: 'State',
      options: ['Completed', 'InCompleted', 'In Progress'],
      validation: { required: false },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'qualification' },
      { type: 'field', name: 'studyField' },
      { type: 'field', name: 'university' },
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'startYear' },
          { type: 'field', name: 'endYear' },
        ],
      },
      { type: 'field', name: 'grade' },
      { type: 'field', name: 'status' },
    ],
  },
};

export function AddEducationForm() {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);
    toast({
      variant: 'success',
      title: 'Education added successfully',
    });
  };

  return (
    <FormRenderer
      config={createEducationFormConfig}
      onSubmit={onsubmit}
      submitLabel="Add Education"
      isDialogForm={true}
    />
  );
}
