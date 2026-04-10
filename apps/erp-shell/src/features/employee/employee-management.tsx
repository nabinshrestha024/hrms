import { useEmployees, type Employee } from '@erp/data-access';
import { Button, HRDialog } from '@erp/ui';
import { useState } from 'react';
import { PageHeader } from '../../components/page-header';
import { EmployeeForm } from '../../features/employee/employee-form-collection/employee-form';
import { EmployeeCard } from './employee-card';
import { EmployeeTable } from './table/employee-table';

export const EmployeeManagement = () => {
  const { data: response } = useEmployees({ pageSize: 100 });
  const data: Employee[] = response?.data ?? [];
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Employee Management"
        isTabs={true}
        data={data}
        dropdownKey="branch"
        dropdownLabel="Branch"
        actionComponent={
          <HRDialog
            open={open}
            onOpenChange={setOpen}
            triggerContent={
              <Button
                type="button"
                variant="secondary"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Employee
              </Button>
            }
            className="max-w-screen p-4 bg-[#F9FAFB] sm:max-w-186.75"
          >
            <EmployeeForm setOpen={setOpen} />
          </HRDialog>
        }
        renderCard={(filtered) => <EmployeeCard data={filtered} />}
        renderTable={(filtered) => <EmployeeTable data={filtered} />}
        filterFn={(data, search, dropdown) => {
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
    </>
  );
};
