import { DataTable } from '@erp/ui';
import { WorkRecord } from '../schema/WorkRecordData';
import { useWorkRecordTable } from './use-work-record-table';

interface WorkRecordTableProps {
  data: WorkRecord[];
}

export const WorkRecordTable = ({ data }: WorkRecordTableProps) => {
  const { columns, table } = useWorkRecordTable({
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
