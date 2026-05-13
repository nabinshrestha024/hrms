import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';
import { EducationType } from '../../schema/education-data';

export const editEducationFormConfig: FormViewConfig = {
  entity: 'edit-education',
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
      validation: { required: true },
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

interface EditEducationFormProps {
  onSuccess?: () => void;
  selectedEducation?: EducationType;
}

export function EditEducationForm({
  onSuccess,
  selectedEducation,
}: EditEducationFormProps = {}) {
  const onsubmit = (_data: Record<string, unknown>) => {
    toast({
      variant: 'success',
      title: 'Education edit successfully',
    });
    onSuccess?.();
    console.warn(_data, 'Eduction');
  };

  return (
    <FormRenderer
      config={editEducationFormConfig}
      onSubmit={onsubmit}
      submitLabel="Edit Education"
      isDialogForm={true}
      defaultValues={{
        qualification: selectedEducation?.qualification || '',
        university: selectedEducation?.university || '',
        studyField: selectedEducation?.studyField || '',
        startYear: selectedEducation?.startYear || '',
        endYear: selectedEducation?.endYear || '',
        grade: selectedEducation?.grade || '',
        status: selectedEducation?.status || '',
      }}
    />
  );
}
