import { useBranches, useDeleteBranch, type Branch } from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  ControlledFormDialog,
  FormDialog,
  ListPage,
  toast,
} from '@erp/ui';
import { useState } from 'react';

import { BranchCard } from './branch-card';
import { BranchForm } from './branch-form';
import { BranchTable } from './branch-table/branch-table';

export const BranchManagement = () => {
  const { data: branchResponse } = useBranches({ page: 1, pageSize: 100 });
  const data: Branch[] = branchResponse?.data ?? [];
  const deleteBranch = useDeleteBranch();

  // Edit & delete need parent-owned state because they target a specific row.
  const [editTarget, setEditTarget] = useState<Branch | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Branch | null>(null);

  const handleEdit = (branch: Branch) => setEditTarget(branch);
  const handleDelete = (id: string) => {
    const branch = data.find((b) => b.id === id);
    if (branch) setDeleteTarget(branch);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteBranch.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Branch deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete branch' });
      },
    });
  };

  return (
    <>
      <ListPage<Branch>
        title="Branch Management"
        search
        data={data}
        dropdowns={[{ key: 'branch', label: 'Branch' }]}
        actionComponent={
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Branch
              </Button>
            }
            title="Branch Details"
            size="lg"
            okText="Add"
          >
            <BranchForm />
          </FormDialog>
        }
        renderCard={(filtered: Branch[]) => (
          <BranchCard
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        renderTable={(filtered: Branch[]) => (
          <BranchTable
            data={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        filterFn={(data, { search, dropdowns }) => {
          const dropdown = dropdowns.branch;
          return data.filter((item: Branch) => {
            const matchesSearch = item.branch
              ?.toLowerCase()
              .includes(search.toLowerCase());
            const matchesDropdown = dropdown ? item.branch === dropdown : true;
            return matchesSearch && matchesDropdown;
          });
        }}
      />

      <ControlledFormDialog
        open={editTarget !== null}
        onOpenChange={(open: boolean) => !open && setEditTarget(null)}
        title="Edit Branch"
        size="lg"
        okText="Save"
      >
        <BranchForm />
      </ControlledFormDialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        title="Delete branch?"
        description={
          deleteTarget
            ? `"${deleteTarget.branch}" will be permanently deleted. This action cannot be undone.`
            : undefined
        }
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
