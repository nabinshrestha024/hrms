import { type Asset } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getAssetsColumns } from './get-all-assets-column';

interface AssetsTableProps {
  data: Asset[];
}

export function useAssetsTable({ data }: AssetsTableProps) {
  const columns = getAssetsColumns();

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
