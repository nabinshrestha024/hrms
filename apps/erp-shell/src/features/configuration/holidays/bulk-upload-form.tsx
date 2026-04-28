import { useCreateHoliday } from '@erp/data-access';
import { Button, HRCard, HRTextarea, toast, useDialogClose } from '@erp/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ConfigBulkUploadTemplateFormValue,
  configBulkUploadTemplateSchema,
} from '../zod/ConfigBulkUpload.Zod';

// MM/DD/YYYY -> YYYY-MM-DD (canonical schema format).
const toIsoDate = (s: string): string | null => {
  const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const [, mm, dd, yyyy] = m;
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
};

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
  const createHoliday = useCreateHoliday();

  const onsubmit = async (data: ConfigBulkUploadTemplateFormValue) => {
    const rows = data.bulkData
      .split(/\r?\n/)
      .map((row) => row.split(',').map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 3 && cells[0]);

    const parsed = rows
      .map(([name, date, type]) => {
        const iso = toIsoDate(date ?? '');
        return iso ? { name, date: iso, type } : null;
      })
      .filter((r): r is { name: string; date: string; type: string } => !!r);

    if (parsed.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No valid rows. Format: Name, MM/DD/YYYY, Type (one per line).',
      });
      return;
    }

    try {
      await Promise.all(parsed.map((row) => createHoliday.mutateAsync(row)));
      toast({
        title: `${parsed.length} holidays added`,
        variant: 'success',
      });
      close();
    } catch {
      toast({ variant: 'destructive', title: 'Bulk upload failed' });
    }
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
