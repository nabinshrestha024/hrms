import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteLeavePayType,
  useLeavePayTypes,
  type LeavePayType,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { MasterSetupBody } from '../body';
import { LeaveTypeTable } from './table/leave-type-table';
import { AddLeaveTypeForm } from './add-leave-type-form';
import { EditLeaveTypeForm } from './edit-leave-type-form';
import { useState } from 'react';

export const LeaveType = () => {
  const { data: response } = useLeavePayTypes({ pageSize: 100 });
  const data: LeavePayType[] = response?.data ?? [];
  const deleteLeaveType = useDeleteLeavePayType();
  const [editTarget, setEditTarget] = useState<LeavePayType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeavePayType | null>(null);
  const handleEdit = (leaveType: LeavePayType) => setEditTarget(leaveType);
  const handleDelete = (id: string) => {
    const leaveType = data.find((b) => b.id === id);
    if (leaveType) setDeleteTarget(leaveType);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteLeaveType.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Leave Type deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Leave Type' });
      },
    });
  };
  return (
    <>
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
          <MasterSetupBody
            component={
              <LeaveTypeTable
                data={rows}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            }
          />
        )}
      />
      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditTarget(null);
          }
        }}
        title="Edit Leave Type"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditLeaveTypeForm selectedLeaveType={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this leave type?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
