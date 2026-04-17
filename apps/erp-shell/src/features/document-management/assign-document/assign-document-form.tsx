import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { Button, HRCard, toast } from '@erp/ui';

export const addAssignDocumentFormConfig: FormViewConfig = {
  entity: 'assignDocument',
  fields: [
    {
      name: 'employeeName',
      type: 'text',
      label: 'Select Employee',
      placeholder: 'Choose Employee',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'documentTemplate',
      type: 'select',
      label: 'Select Document Template',
      placeholder: 'Offer Letter',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Note for Employee',
      placeholder: 'Type here',
      subLabel: 'Less than 200 words',
      isRequired: true,
      validation: { required: true },
    },
  ],
  layout: {
    type: 'section',

    children: [
      {
        type: 'columns',
        columns: 2,
        children: [
          { type: 'field', name: 'employeeName' },
          { type: 'field', name: 'documentTemplate' },
        ],
      },
      { type: 'field', name: 'note' },
    ],
  },
};

export function AssignDocumentForm() {
  const onsubmit = (data: Record<string, unknown>) => {
    console.warn('Assign Document: ', data);
    toast({ variant: 'success', title: 'Assign Document message send' });
  };

  return (
    <HRCard
      cardClassName="p-6 border-none rounded-xl shadow-none bg-white"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <FormRenderer
        config={addAssignDocumentFormConfig}
        onSubmit={onsubmit}
        submitLabel="Add Assign Document"
        isDialogForm={false}
      />
      <div className="bg-white flex justify-end gap-6">
        <Button
          type="button"
          variant="outline"
          className="text-[14px] font-medium leading-5 text-muted-foreground "
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="flex gap-2 text-[14px] font-medium leading-5 text-white items-center"
          form="assignDocument-form"
        >
          Assign Document
        </Button>
      </div>
    </HRCard>
  );
}
