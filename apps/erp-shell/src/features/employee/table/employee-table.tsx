import type { Employee } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useEmployeeTable } from './use-employee-table';

interface EmployeeTableProps {
  data: Employee[];
}

export const EmployeeTable = ({ data }: EmployeeTableProps) => {
  const { columns, table } = useEmployeeTable({ data });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
