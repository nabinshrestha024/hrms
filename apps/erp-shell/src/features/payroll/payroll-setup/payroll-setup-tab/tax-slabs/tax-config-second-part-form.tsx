import { Button, HRCard, HRInput } from '@erp/ui';
import { Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TaxSlabTemplateFormValue } from '../../../zod/TaxSlabs.zod';

export const TaxConfigSecondPartForm = () => {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useFormContext<TaxSlabTemplateFormValue>();

  const { fields } = useFieldArray({
    control,
    name: 'config',
  });

  // const array = () => {
  //   const slabs = watch('config') || [];
  //   const last = slabs[slabs.length - 1];

  //   append({
  //     minAmount: last?.maxAmount ?? 0,
  //     maxAmount: '',
  //     rate: '',
  //     description: '',
  //   });
  // };
  const onAdd = () => {
    const config = getValues('config');
    console.warn('Tax configuration Data: ', config);
    sessionStorage.setItem('taxConfigData', JSON.stringify(config));
    reset();
  };
  return (
    <HRCard
      cardClassName="px-4 py-3 bg-muted rounded-xl shadow-none"
      cardContentClassName="p-0 flex justify-between items-center"
    >
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-4 gap-3">
          <HRInput
            Label="Min Amount"
            type="text"
            placeholder="Percentage"
            error={errors?.config?.[index]?.minAmount?.message}
            {...register(`config.${index}.minAmount`)}
          />

          <HRInput
            Label="Max Amount"
            type="text"
            placeholder="Unlimited"
            error={errors?.config?.[index]?.maxAmount?.message}
            {...register(`config.${index}.maxAmount`)}
          />

          <HRInput
            Label="Rate %"
            type="text"
            placeholder="20"
            error={errors?.config?.[index]?.rate?.message}
            {...register(`config.${index}.rate`)}
          />

          <HRInput
            Label="Description"
            type="text"
            placeholder="e.g., Next  lakhs"
            error={errors?.config?.[index]?.description?.message}
            {...register(`config.${index}.description`)}
          />
        </div>
      ))}

      <Button type="button" onClick={onAdd} variant="secondary">
        <Plus className="w-4 h-4" />
        Add
      </Button>
    </HRCard>
  );
};
