import { DataTable } from '@erp/ui';
import { useEmployeeDetailTable } from './use-employee-detail-table';
import { GeneratePayroll } from '@erp/data-access';

interface EmployeeTableProps {
  data: GeneratePayroll[];
}

export const EmployeeDetailTable = ({ data }: EmployeeTableProps) => {
  const { columns, table } = useEmployeeDetailTable({ data });

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        className="xl:p-0 p-0 rounded-none"
      />
    </>
  );
};
