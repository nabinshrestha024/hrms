import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useEmployees, type Employee } from '@erp/data-access';
import { Button, Dialog, DialogContent, ListPage } from '@erp/ui';
import { useState } from 'react';

import { EmployeeCard } from './employee-card';
import { EmployeeForm } from './employee-form-collection/employee-form';
import { EmployeeTable } from './table/employee-table';

export const EmployeeManagement = () => {
  const { data: response } = useEmployees({ pageSize: 100 });
  const data: Employee[] = response?.data ?? [];
  const [addOpen, setAddOpen] = useState(false);

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
        renderCard={(filtered: Employee[]) => <EmployeeCard data={filtered} />}
        renderTable={(filtered: Employee[]) => (
          <EmployeeTable data={filtered} />
        )}
        filterFn={(data, { search, dropdowns }) => {
          const dropdown = dropdowns.branch;
          return data.filter((item: Employee) => {
            const matchesSearch =
              item.branch?.toLowerCase().includes(search.toLowerCase()) ||
              item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
              item.lastName?.toLowerCase().includes(search.toLowerCase());

            const matchesDropdown = dropdown ? item.branch === dropdown : true;

            return Boolean(matchesSearch) && matchesDropdown;
          });
        }}
      />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-screen p-4 bg-[#F9FAFB] sm:max-w-186.75">
          <EmployeeForm setOpen={setAddOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
