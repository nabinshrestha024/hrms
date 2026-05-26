import { DataTable } from '@erp/ui';
import { LeaveRequest } from '../../schema/LeaveRequestData';
import { useMyRequestTable } from './use-my-request-table';

interface MyRequestTableProps {
  data: LeaveRequest[];
}

export const MyRequestTable = ({ data }: MyRequestTableProps) => {
  const { columns, table } = useMyRequestTable({
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
