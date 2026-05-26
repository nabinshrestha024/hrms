import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  Shift,
  useDeleteShift,
  useShifts,
  type Shift as ShiftRecord,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { Shifts } from './shift';
import { ShiftForm } from './shift-form';
import { useState } from 'react';
import { EditShiftForm } from './edit-shift-form';

export const ShiftHeader = () => {
  const { data: response } = useShifts({ pageSize: 100 });
  const data: ShiftRecord[] = response?.data ?? [];
  const deleteShift = useDeleteShift();
  const [editTarget, setEditTarget] = useState<Shift | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Shift | null>(null);
  const handleEdit = (shift: Shift) => setEditTarget(shift);
  const handleDelete = (id: string) => {
    const shift = data.find((b) => b.id === id);
    if (shift) setDeleteTarget(shift);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteShift.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Shift deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Shift' });
      },
    });
  };
  return (
    <>
      <ListPage<ShiftRecord>
        title="Shift Management"
        data={data}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.CONFIG_SHIFTS}>
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
          </Can>
        }
        renderTable={(rows) => (
          <Shifts data={rows} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />

      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEditTarget(null);
          }
        }}
        title="Edit shift Details"
        size="lg"
        okText="Save Changes"
        formId="edit-shift-form"
        cancelText="Cancel"
      >
        <EditShiftForm selectedShift={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this shift?"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
