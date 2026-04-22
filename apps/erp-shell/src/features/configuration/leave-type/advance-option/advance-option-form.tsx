import {
  Button,
  HRCard,
  HRLabel,
  Switch,
  toast,
  useDialogClose,
} from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  AdvanceOptionTemplateFormValue,
  advanceOptionTemplateSchema,
} from '../../zod/AdvanceOption.Zod';
import { AdvanceOptionSubcomponent } from './advance-option-subcomponent';

export const AdvanceOptionForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AdvanceOptionTemplateFormValue>({
    resolver: zodResolver(advanceOptionTemplateSchema),
    mode: 'onChange',
    defaultValues: {
      allowLeave: false,
    },
  });
  const allowLeave = watch('allowLeave');
  const close = useDialogClose();
  const onsubmit = (data: AdvanceOptionTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    close();
    toast({ title: 'Advance option Added', variant: 'success' });
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <HRCard
        cardClassName="p-4 border border-border rounded-[4px]"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2.5 border border-border rounded-[6px] bg-white flex justify-between items-center">
              <HRLabel>
                Do not allow leave request if there is no balance left
              </HRLabel>

              <Controller
                control={control}
                name="allowLeave"
                render={({ field }) => (
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            {errors.allowLeave && (
              <span className="text-red-500 text-[12px]">
                {errors.allowLeave.message}
              </span>
            )}
          </div>
          {allowLeave && <AdvanceOptionSubcomponent />}
        </div>

        <div className="bg-white flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => close()}>
            Cancel
          </Button>

          <Button type="submit" variant="secondary">
            Save
          </Button>
        </div>
      </HRCard>
    </form>
  );
};
