import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useLeavePayTypes, type LeavePayType } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { MasterSetupBody } from '../body';
import { LeaveTypeTable } from './table/leave-type-table';
import { AddLeaveTypeForm } from './add-leave-type-form';

export const LeaveType = () => {
  const { data: response } = useLeavePayTypes({ pageSize: 100 });
  const data: LeavePayType[] = response?.data ?? [];

  return (
    <ListPage<LeavePayType>
      title="Leave Type"
      search
      data={data}
      filterFn={(rows, { search }) =>
        rows.filter((row) => {
          const q = search.toLowerCase();
          return (
            row.name.toLowerCase().includes(q) ||
            row.code.toLowerCase().includes(q)
          );
        })
      }
      actionComponent={
        <Can action="create" subject={PERM_SUBJECTS.MASTER_LEAVE_PAY_TYPES}>
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
            title="Add New Leave Type"
            size="lg"
            formId="leave-pay-type-form"
            okText="Add"
            cancelText="Cancel"
          >
            {({ close }: { close: () => void }) => (
              <AddLeaveTypeForm onSuccess={close} />
            )}
          </FormDialog>
        </Can>
      }
      renderTable={(rows) => (
        <MasterSetupBody component={<LeaveTypeTable data={rows} />} />
      )}
    />
  );
};
