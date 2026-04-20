import { DataTable } from '@erp/ui';
import { leaveTypeDataType } from '../../schema/LeaveTypeData';
import { useLeaveTypeTable } from './use-leave-type-table';

interface LeaveTypeTableProps {
  data: leaveTypeDataType[];
}

export const LeaveTypeTable = ({ data }: LeaveTypeTableProps) => {
  const { columns, table } = useLeaveTypeTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="p-0 rounded-none"
      />
    </>
  );
};
