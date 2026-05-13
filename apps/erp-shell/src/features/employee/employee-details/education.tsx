import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
} from '@erp/ui';
import { AddEducationForm } from './education/add-education-form';
import { Plus } from 'lucide-react';
import { educationData, EducationType } from '../schema/education-data';
import { useState } from 'react';
import { EducationCard } from './education/education-card';
import { EditEducationForm } from './education/edit-education-form';

export const Education = () => {
  const [deleteTarget, setDeleteTarget] = useState<EducationType | null>(null);
  const [editTarget, setEditTarget] = useState<EducationType | null>(null);

  const handleEdit = (education: EducationType) => setEditTarget(education);

  const handleDelete = (id: string) => {
    const education = educationData.find((b) => b.id === id);
    if (education) setDeleteTarget(education);
  };
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    // await deleteEducation.mutateAsync(deleteTarget.id, {
    //   onSuccess: () => {
    //     toast({ variant: 'success', title: 'Education deleted successfully' });
    //   },
    //   onError: () => {
    //     toast({ variant: 'destructive', title: 'Failed to delete Education' });
    //   },
    // });
  };
  return (
    <>
      <div className="flex flex-col gap-6 max-h-115 overflow-auto pr-3">
        <div className="flex justify-between items-center">
          <div className="text-[18px] font-medium leading-7 text-foreground">
            Education
          </div>

          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                className="flex gap-2 items-center text-[14px] font-medium leading-5"
              >
                <Plus className="text-[16px] " />
                Add Education
              </Button>
            }
            title="Education Details"
            size="lg"
            okText="Add"
          >
            {({ close }: { close: () => void }) => (
              <AddEducationForm onSuccess={close} />
            )}
          </FormDialog>
        </div>
        <EducationCard
          onDelete={handleDelete}
          onEdit={handleEdit}
          education={educationData}
        />
      </div>
      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => !open && setEditTarget(null)}
        title="Edit Education"
        size="lg"
        okText="Save"
      >
        <EditEducationForm selectedEducation={editTarget ?? undefined} />
      </ControlledFormDialog>
      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this education record?"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
