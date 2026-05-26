import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteHolidayType,
  useHolidays,
  type Holiday,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { ConfigHoliday } from './config-holiday';
import { ConfigHolidayForm } from './config-holiday-form';
import { ConfigBulkUploadForm } from './bulk-upload-form';
import { useState } from 'react';
import { EditConfigHolidayForm } from './edit-holiday-form';

export const ConfigHolidayHeader = () => {
  const { data: response } = useHolidays({
    pageSize: 100,
    sortBy: 'date',
    sortOrder: 'asc',
  });
  const data: Holiday[] = response?.data ?? [];
  const deleteHoliday = useDeleteHolidayType();
  const [editTarget, setEditTarget] = useState<Holiday | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Holiday | null>(null);
  const handleEdit = (holiday: Holiday) => setEditTarget(holiday);
  const handleDelete = (id: string) => {
    const holiday = data.find((b) => b.id === id);
    if (holiday) setDeleteTarget(holiday);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteHoliday.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Holiday deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete holiday' });
      },
    });
  };
  return (
    <>
      <ListPage<Holiday>
        title="Leave Type"
        data={data}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.CONFIG_HOLIDAYS}>
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
                okText="Add Holiday"
                cancelText="Cancel"
                formId="add-holiday-form"
              >
                <ConfigHolidayForm />
              </FormDialog>
            </div>
          </Can>
        }
        dropdowns={[{ key: 'date', label: 'Date' }]}
        filterFn={(rows, { dropdowns }) =>
          rows.filter((row) =>
            Object.entries(dropdowns).every(
              ([key, value]) =>
                !value || String(row[key as keyof typeof row]) === value
            )
          )
        }
        renderTable={(rows) => (
          <ConfigHoliday
            data={rows}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
        title="Edit holiday Details"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
        formId="edit-holiday-form"
      >
        <EditConfigHolidayForm selectedHoliday={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this holiday?"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
