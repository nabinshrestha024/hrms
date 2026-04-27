import { type Asset } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useAssignmentHistoryTable } from './use-assignement-history-table';

interface AssignmentHistoryTableProps {
  data: Asset[];
}

export const AssignmentHistoryTable = ({
  data,
}: AssignmentHistoryTableProps) => {
  const { columns, table } = useAssignmentHistoryTable({
    data,
  });

  return (
    <>
      <div className="px-6 pt-0 pb-32.5">
        <DataTable table={table.table} columns={columns} />
      </div>
    </>
  );
};
