import { DataTable } from '@erp/ui';
import { LeaveLog } from '../../../Schema/LeaveLogData';
import { useLeaveLogTable } from './use-leave-log-table';

interface LeaveLogTableProps {
  data: LeaveLog[];
}

export const LeaveLogTable = ({ data }: LeaveLogTableProps) => {
  const { columns, table } = useLeaveLogTable({
    data,
  });

  return (
    <>
      <div className="max-w-273.5">
        <DataTable table={table} columns={columns} className="p-0" />
      </div>
    </>
  );
};
