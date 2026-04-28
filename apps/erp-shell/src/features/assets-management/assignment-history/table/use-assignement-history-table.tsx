import { type Asset } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getAssignmentHistoryColumns } from './get-assignment-history-column';

interface AssignmentHistoryTableProps {
  data: Asset[];
}

export function useAssignmentHistoryTable({
  data,
}: AssignmentHistoryTableProps) {
  const columns = getAssignmentHistoryColumns();

  const table = useServerTableState<Asset>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return {
    table,
    columns,
  };
}
