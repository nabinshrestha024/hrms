import { Button, FormDialog, ListPage } from '@erp/ui';
import { shiftData } from '../schema/ShiftData';
import { Shift } from './shift';
import { ShiftForm } from './shift-form';

export const ShiftHeader = () => {
  return (
    <ListPage
      title="Shift Management"
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
      renderTable={(rows) => <Shift data={rows} />}
    />
  );
};
