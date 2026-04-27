import { useHolidays, type Holiday } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { ConfigHoliday } from './config-holiday';
import { ConfigHolidayForm } from './config-holiday-form';
import { ConfigBulkUploadForm } from './bulk-upload-form';

export const ConfigHolidayHeader = () => {
  const { data: response } = useHolidays({
    pageSize: 100,
    sortBy: 'date',
    sortOrder: 'asc',
  });
  const data: Holiday[] = response?.data ?? [];

  return (
    <ListPage<Holiday>
      title="Leave Type"
      data={data}
      actionComponent={
        <div className="flex gap-4">
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="text-[14px] font-medium leading-5 text-primary border border-primary"
              >
                Bulk Upload
              </Button>
            }
            title="Bulk Upload Holiday"
            size="lg"
            componentClassName="border-none rounded-none shadow-none p-0"
            dialogClassName="sm:max-w-[498px]"
          >
            <ConfigBulkUploadForm />
          </FormDialog>
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Holiday
              </Button>
            }
            title="Add Holiday Type"
            size="lg"
            componentClassName="border-none rounded-none shadow-none p-0"
          >
            <ConfigHolidayForm />
          </FormDialog>
        </div>
      }
      dropdowns={[{ key: 'date', label: 'Date' }]}
      filterFn={(rows, { dropdowns }) =>
        rows.filter((row) =>
          Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(row[key as keyof typeof row]) === value
          )
        )
      }
      renderTable={(rows) => <ConfigHoliday data={rows} />}
    />
  );
};
