import { DataTable } from '@erp/ui';
import { Employee, employees } from '../schema/EmployeeData';
import { useEmployeeTable } from './use-employee-form';

interface EmployeeTableProps {
  data?: Employee[];
}

export const EmployeeTable = ({ data = employees }: EmployeeTableProps) => {
  const { columns, table } = useEmployeeTable({
    data,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable
          table={table}
          columns={columns}
          // rowActions={rowActions}
        />
      </div>
    </>
  );
};
