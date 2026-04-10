import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { toast } from '@erp/ui';

export const assignDocumentFormConfig: FormViewConfig = {
  entity: 'assignDocument',

  fields: [
    {
      name: 'documentTemplate',
      type: 'select',
      label: 'Select Document Template',
      placeholder: 'Document Template',
      isRequired: true,
      options: [
        'Offer Letter',
        'Employee Contract',
        'NDA Agreement',
        'Policy Handbook',
        'Benefits Guide',
      ],
      validation: { required: true },
    },

    {
      name: 'note',
      type: 'textarea',
      label: 'Note for Employee',
      placeholder: 'Type here',
      validation: { required: false, max: 200 },
      subLabel: 'Less than 200 words',
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'documentTemplate' },
      { type: 'field', name: 'documentCategory' },
      { type: 'field', name: 'status' },
      { type: 'field', name: 'date' },
      { type: 'field', name: 'note' },
    ],
  },
};

export function AssignDocumentForm() {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Save Changes:', data);

    toast({
      variant: 'success',
      title: 'Document assigned successfully',
    });
  };

  return (
    <FormRenderer
      config={assignDocumentFormConfig}
      onSubmit={onsubmit}
      submitLabel="Assign Document"
      isDialogForm={true}
    />
  );
}
