import { useServerTableState } from '@erp/ui';
import { AssetType } from '../../schema/AllAssetsData';
import { getAssignmentHistoryColumns } from './get-assignment-history-column';

interface AssignmentHistoryTableProps {
  data: AssetType[];
}

export function useAssignmentHistoryTable({
  data,
}: AssignmentHistoryTableProps) {
  const columns = getAssignmentHistoryColumns();

  const table = useServerTableState<AssetType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.assetName,
  });

  return {
    table,
    columns,
  };
}
