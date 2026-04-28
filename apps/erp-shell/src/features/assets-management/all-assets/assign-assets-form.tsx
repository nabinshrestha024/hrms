import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useUpdateAsset } from '@erp/data-access';
import { toast } from '@erp/ui';

export const assignAssetsFormConfig: FormViewConfig = {
  entity: 'assign-assets',
  fields: [
    {
      name: 'assetsName',
      type: 'text',
      label: 'Assets Name',
      placeholder: 'e.g Macbook Pro 16”',
      isRequired: true,
      validation: { required: true },
    },
    {
      name: 'employeeName',
      type: 'select',
      label: 'Employee Name',
      isRequired: true,
      options: ['Sita'],
      validation: { required: true },
    },
  ],

  layout: {
    type: 'section',
    children: [
      { type: 'field', name: 'assetsName' },
      { type: 'field', name: 'employeeName' },
    ],
  },
};
interface AssignAssetsFormProps {
  assetId?: string;
  assetName?: string;
  onSuccess?: () => void;
}

export function AssignAssetsForm({
  assetId,
  assetName,
  onSuccess,
}: AssignAssetsFormProps = {}) {
  const updateAsset = useUpdateAsset(assetId ?? '');

  const onsubmit = (data: Record<string, unknown>) => {
    if (!assetId) {
      toast({ variant: 'destructive', title: 'Missing asset context' });
      return;
    }
    updateAsset.mutate(
      {
        status: 'assigned',
        assignedTo: String(data.employeeName ?? ''),
        assignedDate: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Asset assigned' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to assign asset' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={assignAssetsFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
      defaultValues={assetName ? { assetsName: assetName } : undefined}
    />
  );
}
