import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { holidayTableData } from '../schema/HolidayData';
import { ConfigHoliday } from './config-holiday';
import { ConfigHolidayForm } from './config-holiday-form';
import { ConfigBulkUploadForm } from './bulk-upload-form';

export const ConfigHolidayHeader = () => {
  return (
    <DocumentHeader
      title="Leave Type"
      isSearch={false}
      data={holidayTableData}
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
      filterFn={(data, dropdowns) => {
        return data.filter((item) => {
          const matchesDropdowns = Object.entries(dropdowns || {}).every(
            ([key, value]) =>
              !value || String(item[key as keyof typeof item]) === value
          );

          return matchesDropdowns;
        });
      }}
      renderTable={(filteredData) => <ConfigHoliday data={filteredData} />}
    />
  );
};
