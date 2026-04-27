import { useShifts, type Shift as ShiftRecord } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { Shift } from './shift';
import { ShiftForm } from './shift-form';

export const ShiftHeader = () => {
  const { data: response } = useShifts({ pageSize: 100 });
  const data: ShiftRecord[] = response?.data ?? [];

  return (
    <ListPage<ShiftRecord>
      title="Shift Management"
      data={data}
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
