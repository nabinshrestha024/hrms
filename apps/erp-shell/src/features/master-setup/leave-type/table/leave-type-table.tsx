import { type LeavePayType } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useLeaveTypeTable } from './use-leave-type-table';

interface LeaveTypeTableProps {
  data: LeavePayType[];
  onEdit?: (leaveType: LeavePayType) => void;
  onDelete?: (id: string) => void;
}

export const LeaveTypeTable = ({
  data,
  onDelete,
  onEdit,
}: LeaveTypeTableProps) => {
  const { columns, table } = useLeaveTypeTable({ data, onDelete, onEdit });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
