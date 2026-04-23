import {
  Button,
  HRCard,
  HRInput,
  HRSelect,
  OptionRadioGroup,
  Switch,
  toast,
  useDialogClose,
} from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  accrualFrequencyOption,
  applicableToOption,
  genderOption,
  leaveTypeOption,
} from '../../schema/CommonOptionData';
import {
  CommonOptionTemplateFormValue,
  commonOptionTemplateSchema,
} from '../../zod/CommonOptionForm.Zod';
import { ManualAccrual, MonthlyAccrual } from './common-option-subcomponent';

export const CommonOptionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CommonOptionTemplateFormValue>({
    resolver: zodResolver(commonOptionTemplateSchema),
    mode: 'onChange',
  });

  const accrualFrequency = watch('accrualFrequency');
  const isGenderBased = watch('gender');
  const close = useDialogClose();
  const onsubmit = (data: CommonOptionTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    close();
    toast({ title: 'Leave Type Added', variant: 'success' });
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <HRCard
        cardClassName="p-4 border border-border rounded-[4px]"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <HRInput
              Label="Leave Name"
              isRequired
              type="text"
              placeholder="e.g. Annual Leave"
              error={errors.leaveName?.message as string}
              {...register('leaveName')}
            />

            <HRInput
              Label="Code"
              isRequired
              type="text"
              placeholder="e.g. AL"
              error={errors.code?.message as string}
              {...register('code')}
            />

            <Controller
              name="leaveType"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Leave Type"
                  isRequired
                  selectData={leaveTypeOption}
                  placeholder="Select Leave Type"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.leaveType?.message}
                />
              )}
            />

            <Controller
              name="applicableTo"
              control={control}
              render={({ field }) => (
                <HRSelect
                  Label="Applicable To"
                  isRequired
                  selectData={applicableToOption}
                  placeholder="Select Applicable To"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.applicableTo?.message}
                />
              )}
            />
          </div>

          <div className="px-3 py-2.5 border border-border rounded-[6px] bg-white flex flex-col gap-4">
            <Controller
              control={control}
              name="accrualFrequency"
              render={({ field }) => (
                <OptionRadioGroup
                  isRequired
                  Label="Accrual Frequency"
                  options={accrualFrequencyOption}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-3"
                  itemClassName="border-[#A1A1AA]"
                  error={errors.accrualFrequency?.message as string}
                />
              )}
            />
            {accrualFrequency === 'Monthly' && (
              <MonthlyAccrual value={accrualFrequency} />
            )}
            {accrualFrequency === 'Manually' && <ManualAccrual />}
          </div>

          <div className="relative px-3 py-2.5 border border-border rounded-[6px] bg-white">
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <OptionRadioGroup
                  Label="Gender Based Leave"
                  labelClassName={`${
                    !isGenderBased && 'text-secondary-foreground'
                  }`}
                  options={genderOption}
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-3"
                  itemClassName="border-[#A1A1AA]"
                  disabled={!isGenderBased}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Switch
                  onCheckedChange={(checked) => {
                    field.onChange(checked);

                    if (!checked) {
                      setValue('gender', undefined);
                    }
                  }}
                  className="absolute top-3 right-5"
                />
              )}
            />
          </div>
        </div>

        <div className="bg-white flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => close()}>
            Cancel
          </Button>

          <Button type="submit" variant="secondary">
            Add Leave Type
          </Button>
        </div>
      </HRCard>
    </form>
  );
};
