import { useServerTableState } from '@erp/ui';
import { AssetType } from '../../schema/AllAssetsData';
import { getAssetsColumns } from './get-all-assets-column';

interface AssetsTableProps {
  data: AssetType[];
}

export function useAssetsTable({ data }: AssetsTableProps) {
  const columns = getAssetsColumns();

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
