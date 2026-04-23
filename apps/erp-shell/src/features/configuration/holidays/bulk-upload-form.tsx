import { Button, HRCard, HRTextarea, toast, useDialogClose } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ConfigBulkUploadTemplateFormValue,
  configBulkUploadTemplateSchema,
} from '../zod/ConfigBulkUpload.Zod';

export const ConfigBulkUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigBulkUploadTemplateFormValue>({
    resolver: zodResolver(configBulkUploadTemplateSchema),
    mode: 'onChange',
  });

  const close = useDialogClose();
  const onsubmit = (data: ConfigBulkUploadTemplateFormValue) => {
    console.warn('Save Changes: ', data);
    close();
    toast({ title: 'Leave Type Added', variant: 'success' });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
        Enter Holidays in CSV format: Name,Date(MM/DD/YYY), Type
      </span>
      <form onSubmit={handleSubmit(onsubmit)}>
        <HRCard
          cardClassName="p-4 border border-border rounded-[4px]"
          cardContentClassName="p-0 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4 max-h-161 overflow-auto ">
            <HRTextarea
              placeholder="New Year’s Day, 01/01/2026, National Holiday Independence Day, 07/04/2026, National Holiday Company Day, 03/15/2026, National Holiday"
              subLabel="Types: National, Regional, Company, Optional"
              error={errors.bulkData?.message as string}
              {...register('bulkData')}
            />
          </div>

          <div className="bg-white flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => close()}>
              Cancel
            </Button>

            <Button type="submit" variant="secondary">
              Upload
            </Button>
          </div>
        </HRCard>
      </form>
    </div>
  );
};
