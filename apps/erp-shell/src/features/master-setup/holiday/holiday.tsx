import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteHolidayType,
  useHolidayTypes,
  type HolidayType,
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
import { AddHolidayForm } from './add-holiday-form';
import { HolidayTable } from './table/holiday-table';
import { EditHolidayForm } from './edit-holiday-form';
import { useState } from 'react';

export const Holiday = () => {
  const { data: response } = useHolidayTypes({ pageSize: 100 });
  const data: HolidayType[] = response?.data ?? [];
  const deleteHoliday = useDeleteHolidayType();
  const [editTarget, setEditTarget] = useState<HolidayType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HolidayType | null>(null);
  const handleEdit = (holiday: HolidayType) => setEditTarget(holiday);
  const handleDelete = (id: string) => {
    const holiday = data.find((b) => b.id === id);
    if (holiday) setDeleteTarget(holiday);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteHoliday.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Holiday  deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Holiday ' });
      },
    });
  };
  return (
    <>
      <ListPage<HolidayType>
        title="Holiday"
        search
        data={data}
        filterFn={(rows, { search }) =>
          rows.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase())
          )
        }
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.MASTER_HOLIDAY_TYPES}>
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
          </Can>
        }
        renderTable={(rows) => (
          <MasterSetupBody
            component={
              <HolidayTable
                data={rows}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
        title="Edit Holiday Type"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditHolidayForm selectedHolidayType={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete the Currency?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
