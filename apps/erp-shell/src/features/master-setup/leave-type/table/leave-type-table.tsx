import { type LeavePayType } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useLeaveTypeTable } from './use-leave-type-table';

interface LeaveTypeTableProps {
  data: LeavePayType[];
}

export const LeaveTypeTable = ({ data }: LeaveTypeTableProps) => {
  const { columns, table } = useLeaveTypeTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
