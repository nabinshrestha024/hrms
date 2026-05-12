import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDepartments,
  useDeleteDepartment,
  type Department,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { useState } from 'react';

import { DepartmentCard } from './department-card';
import { DepartmentForm } from './department-form';
import { EditDepartmentForm } from './edit-department-form';

export const DepartmentManagement = () => {
  const { data: deptResponse } = useDepartments({ pageSize: 100 });
  const data: Department[] = deptResponse?.data ?? [];
  const deleteDepartment = useDeleteDepartment();

  const [editTarget, setEditTarget] = useState<Department | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);

  const handleEdit = (dept: Department) => setEditTarget(dept);
  const handleDelete = (id: string) => {
    const dept = data.find((d) => d.id === id);
    if (dept) setDeleteTarget(dept);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteDepartment.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({
          variant: 'success',
          title: 'Department deleted successfully',
        });
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Failed to delete department',
        });
      },
    });
  };

  return (
    <>
      <ListPage<Department>
        title="Department Management"
        search
        views={['card']}
        data={data}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.HR_DEPARTMENTS}>
            <FormDialog
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="text-[14px] font-medium leading-5 text-white"
                >
                  Add Department
                </Button>
              }
              title="Department Details"
              size="lg"
              okText="Add"
              cancelText="Cancel"
            >
              <DepartmentForm />
            </FormDialog>
          </Can>
        }
        renderCard={(filtered: Department[]) => (
          <DepartmentCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        filterFn={(data, { search, dropdowns }) => {
          const dropdown = dropdowns.location;
          return data.filter((item: Department) => {
            const matchesSearch = item.department
              ?.toLowerCase()
              .includes(search.toLowerCase());
            const matchesDropdown = dropdown
              ? item.location === dropdown
              : true;
            return matchesSearch && matchesDropdown;
          });
        }}
      />

      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => !open && setEditTarget(null)}
        title="Edit Department"
        size="lg"
        okText="Save Change"
        cancelText="Cancel"
      >
        {editTarget && <EditDepartmentForm selectedDepartment={editTarget} />}
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete this department"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
