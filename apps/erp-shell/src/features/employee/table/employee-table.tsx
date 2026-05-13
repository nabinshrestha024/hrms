import type { Employee } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useEmployeeTable } from './use-employee-table';

interface ColumnActions {
  onBlock?: (id: string) => void;
  onDelete?: (id: string) => void;
}
interface EmployeeTableProps {
  data: Employee[];
  actions?: ColumnActions;
}

export const EmployeeTable = ({ data, actions }: EmployeeTableProps) => {
  const { columns, table } = useEmployeeTable({ data, actions });

  return (
    <>
      <div className="px-3 lg:px-6 pb-19.5 bg-background">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
