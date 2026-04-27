import { useLeaveTypes, type LeaveType } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { ConfigurationLeaveTypeTable } from './table/leave-types-table';
import { ConfigurationLeaveTypeTabs } from './leave-type-form-tabs';

export const ConfigurationLeaveTypes = () => {
  const { data: response } = useLeaveTypes({ pageSize: 100 });
  const data: LeaveType[] = response?.data ?? [];

  return (
    <ListPage<LeaveType>
      title="Leave Type"
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
              Add Leave Type
            </Button>
          }
          title="Add Leave Type"
          size="lg"
          componentClassName="border-none rounded-none shadow-none p-0"
          dialogClassName="sm:max-w-[717px]"
        >
          <ConfigurationLeaveTypeTabs />
        </FormDialog>
      }
      renderTable={(rows) => <ConfigurationLeaveTypeTable data={rows} />}
    />
  );
};
