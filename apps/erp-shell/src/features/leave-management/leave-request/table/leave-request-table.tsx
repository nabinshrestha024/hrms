import { DataTable } from '@erp/ui';
import { LeaveRequest } from '../../schema/LeaveRequestData';
import { useLeaveRequestTable } from './use-leave-request-table';

interface LeaveRequestTableProps {
  data: LeaveRequest[];
}

export const LeaveRequestTable = ({ data }: LeaveRequestTableProps) => {
  const { columns, table } = useLeaveRequestTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="xl:p-0 p-0 rounded-none"
      />
    </>
  );
};
