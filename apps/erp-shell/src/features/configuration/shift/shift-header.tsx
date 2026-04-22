import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { shiftData } from '../schema/ShiftData';
import { Shift } from './shift';
import { ShiftForm } from './shift-form';

export const ShiftHeader = () => {
  return (
    <DocumentHeader
      title="Shift Management"
      isSearch={false}
      data={shiftData}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Add Shift
            </Button>
          }
          title="Add Shift"
          size="lg"
          okText="Add Shift"
          cancelText="Cancel"
          formId="config-shift-form"
          dialogClassName="sm:max-h-[100vh]"
        >
          <ShiftForm />
        </FormDialog>
      }
      renderTable={(filteredData) => <Shift data={filteredData} />}
    />
  );
};
