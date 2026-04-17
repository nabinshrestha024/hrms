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
        isTabs={false}
        isSearch={true}
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
                Add Department
              </Button>
            }
            title="Department Details"
            size="lg"
            okText="Add"
          >
            <DepartmentForm />
          </FormDialog>
        }
        renderCard={(filtered: Department[]) => (
          <DepartmentCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        renderTable={() => <></>}
        filterFn={(data: Department[], search: string, dropdown?: string) => {
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
        okText="Save"
      >
        <DepartmentForm />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        title="Delete department?"
        description={
          deleteTarget
            ? `"${deleteTarget.department}" will be permanently deleted. This action cannot be undone.`
            : undefined
        }
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
