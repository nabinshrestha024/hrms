import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteJobLevel,
  useJobLevels,
  type JobLevel as JobLevelType,
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
import { AddJobLevelForm } from './job-level-form';
import { JobLevelTable } from './table/job-level-table';
import { useState } from 'react';
import { EditJobLevelForm } from './edit-job-level-form';

export const JobLevel = () => {
  const { data: response } = useJobLevels({
    pageSize: 100,
    sortBy: 'rank',
    sortOrder: 'asc',
  });
  const data: JobLevelType[] = response?.data ?? [];
  const deleteJobLevel = useDeleteJobLevel();
  const [editTarget, setEditTarget] = useState<JobLevelType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<JobLevelType | null>(null);
  const handleEdit = (jobLevel: JobLevelType) => setEditTarget(jobLevel);
  const handleDelete = (id: string) => {
    const jobLevel = data.find((b) => b.id === id);
    if (jobLevel) setDeleteTarget(jobLevel);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteJobLevel.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Job Level  deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Job Level ' });
      },
    });
  };
  return (
    <>
      <ListPage<JobLevelType>
        title="Job Levels"
        search
        data={data}
        filterFn={(rows, { search }) =>
          rows.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase())
          )
        }
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.MASTER_JOB_LEVELS}>
            <FormDialog
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="text-[14px] font-medium leading-5 text-white"
                >
                  Add Job Level
                </Button>
              }
              title="Add New Job Level"
              size="lg"
              formId="job-level-form"
              okText="Add"
              cancelText="Cancel"
            >
              {({ close }: { close: () => void }) => (
                <AddJobLevelForm onSuccess={close} />
              )}
            </FormDialog>
          </Can>
        }
        renderTable={(rows) => (
          <MasterSetupBody
            component={
              <JobLevelTable
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
        title="Edit Job Level"
        size="lg"
        okText="Save Changes"
        cancelText="Cancel"
      >
        <EditJobLevelForm selectedJob={editTarget ?? undefined} />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this job level?"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
