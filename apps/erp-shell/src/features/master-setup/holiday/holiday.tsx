import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { MasterSetupBody } from '../body';
import { AddHolidayForm } from './add-holiday-form';
import { HolidayTable } from './table/holiday-table';
import { holidayData } from '../schema/HolidayData';

export const Holiday = () => {
  return (
    <DocumentHeader
      title="Holiday"
      isSearch={true}
      data={holidayData}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Add Holiday Type
            </Button>
          }
          title="Add New Holiday Type"
          size="lg"
          formId="holiday-form"
          okText="Add"
          cancelText="Cancel"
        >
          {({ close }: { close: () => void }) => (
            <AddHolidayForm onSuccess={close} />
          )}
        </FormDialog>
      }
      renderTable={(filteredData) => (
        <MasterSetupBody component={<HolidayTable data={filteredData} />} />
      )}
    />
  );
};
