import { FormRenderer, type FormViewConfig } from '@erp/config-engine';
import { useUpdateAsset, type AssetCondition } from '@erp/data-access';
import { toast } from '@erp/ui';
import { UserCard } from '../../../components/user-card';

export const returnAssetsFormConfig: FormViewConfig = {
  entity: 'return-assets',
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
      name: 'condition',
      type: 'select',
      label: 'Condition After Return',
      isRequired: true,
      options: ['Good', 'Excellent', 'Poor'],
      validation: { required: true },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Type here..',
      isRequired: true,
      subLabel: 'Less than 200 words',
      validation: {
        required: true,
        max: 200,
      },
    },
  ],

  layout: {
    type: 'section',
    title: 'Process Return From:',
    header: (
      <UserCard
        employeeId="E-001"
        employeeName="Samita Pandey"
        department="Technical"
      />
    ),
    children: [
      { type: 'field', name: 'assetsName' },
      { type: 'field', name: 'condition' },
      { type: 'field', name: 'description' },
    ],
  },
};
interface ReturnAssetsFormProps {
  assetId?: string;
  onSuccess?: () => void;
}

export function ReturnAssetsForm({
  assetId,
  onSuccess,
}: ReturnAssetsFormProps = {}) {
  const updateAsset = useUpdateAsset(assetId ?? '');

  const onsubmit = (data: Record<string, unknown>) => {
    if (!assetId) {
      toast({ variant: 'destructive', title: 'Missing asset context' });
      return;
    }
    const condition = String(
      data.condition ?? ''
    ).toLowerCase() as AssetCondition;

    updateAsset.mutate(
      {
        status: 'available',
        assignedTo: null,
        assignedDate: null,
        condition,
      },
      {
        onSuccess: () => {
          toast({ variant: 'success', title: 'Asset returned' });
          onSuccess?.();
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Failed to return asset' });
        },
      }
    );
  };

  return (
    <FormRenderer
      config={returnAssetsFormConfig}
      onSubmit={onsubmit}
      submitLabel="Submit Request"
      fieldsetClassName="max-h-[538px] overflow-auto pr-2"
      isDialogForm={true}
    />
  );
}
