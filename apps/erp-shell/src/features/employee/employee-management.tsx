import { Can, PERM_SUBJECTS } from '@erp/auth';
import {
  useDeleteEmployee,
  useEmployees,
  type Employee,
} from '@erp/data-access';
import {
  Button,
  ConfirmDialog,
  Dialog,
  DialogContent,
  ListPage,
  toast,
} from '@erp/ui';
import { useState } from 'react';

import { EmployeeCard } from './employee-card';
import { EmployeeForm } from './employee-form-collection/employee-form';
import { EmployeeTable } from './table/employee-table';

export const EmployeeManagement = () => {
  const { data: response } = useEmployees({ pageSize: 100 });
  const data: Employee[] = response?.data ?? [];
  const deleteEmployee = useDeleteEmployee();

  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [blockTarget, setBlockTarget] = useState<Employee | null>(null);

  const handleDelete = (id: string) => {
    const employee = data.find((b) => b.id === id);
    if (employee) setDeleteTarget(employee);
  };
  const handleBlock = (id: string) => {
    const employee = data.find((e) => e.id === id);
    if (employee) setBlockTarget(employee);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteEmployee.mutateAsync(deleteTarget.id, {
      onSuccess: () => {
        toast({ variant: 'success', title: 'Employee deleted successfully' });
      },
      onError: () => {
        toast({ variant: 'destructive', title: 'Failed to delete Employee' });
      },
    });
  };
  return (
    <>
      <ListPage<Employee>
        title="Employee Management"
        search
        data={data}
        dropdowns={[{ key: 'branch', label: 'Branch' }]}
        actionComponent={
          <Can action="create" subject={PERM_SUBJECTS.HR_EMPLOYEES}>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
              onClick={() => setAddOpen(true)}
            >
              Add Employee
            </Button>
          </Can>
        }
        renderCard={(filtered: Employee[]) => (
          <EmployeeCard
            data={filtered}
            onBlock={handleDelete}
            onDelete={handleDelete}
          />
        )}
        renderTable={(filtered: Employee[]) => (
          <EmployeeTable
            data={filtered}
            actions={{
              onBlock: handleBlock,
              onDelete: handleDelete,
            }}
          />
        )}
        filterFn={(data, { search, dropdowns }) => {
          const dropdown = dropdowns.branch;
          return data.filter((item: Employee) => {
            const matchesSearch =
              item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
              item.email?.toLowerCase().includes(search.toLowerCase()) ||
              item.employeeId?.toLowerCase().includes(search.toLowerCase());

            const matchesDropdown = dropdown ? item.branch === dropdown : true;

            return Boolean(matchesSearch) && matchesDropdown;
          });
        }}
      />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-screen p-4 bg-background sm:max-w-160 lg:max-w-186.75 max-h-screen">
          <EmployeeForm setOpen={setAddOpen} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={blockTarget !== null}
        onOpenChange={(open: boolean) => !open && setBlockTarget(null)}
        description="Are you sure you want to block employee"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}
        description="Are you sure you want to delete employee"
        confirmText="Delete"
        destructive
        onConfirm={confirmDelete}
      />
    </>
  );
};
