import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteWorkType,
  useWorkTypes,
  type WorkType as WorkTypeRecord,
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
import { WorkTable } from './table/work-type-table';
import { AddWorkTypeForm } from './add-work-type-form';
import { useState } from 'react';
import { EditWorkTypeForm } from './edit-work-type-form';

export const WorkType = () => {
  const { data: response } = useWorkTypes({ pageSize: 100 });
  const data: WorkTypeRecord[] = response?.data ?? [];
  const deleteWorkType = useDeleteWorkType();
  const [editTarget, setEditTarget] = useState<WorkTypeRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WorkTypeRecord | null>(null);
  const handleEdit = (workType: WorkTypeRecord) => setEditTarget(workType);
  const handleDelete = (id: string) => {
    const workType = data.find((b) => b.id === id);
    if (workType) setDeleteTarget(workType);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteWorkType.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Work Type deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Work Type' });
      },
    });
  };
  return (
    <>
      <ListPage<WorkTypeRecord>
        title="Work Type"
        search
        data={data}
        filterFn={(rows, { search }) =>
          rows.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase())
          )
        }
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.MASTER_WORK_TYPES}>
            <FormDialog
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="text-[14px] font-medium leading-5 text-white"
                >
                  Add Work Type
                </Button>
              }
              title="Add New Work Type"
              size="lg"
              okText="Add"
              cancelText="Cancel"
            >
              {({ close }: { close: () => void }) => (
                <AddWorkTypeForm onSuccess={close} />
              )}
            </FormDialog>
          </Can>
        }
        renderTable={(rows) => (
          <MasterSetupBody
            component={
              <WorkTable
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
        title="Edit Work Type"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditWorkTypeForm selectedWorkType={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this work type?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
