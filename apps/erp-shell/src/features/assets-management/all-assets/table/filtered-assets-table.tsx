import { DataTable } from '@erp/ui';
import { AssetType } from '../../schema/AllAssetsData';
import { useAssetsTable } from './use-all-assets-table';

interface AssetsTableProps {
  data: AssetType[];
}

export const FilteredAssetsTable = ({ data }: AssetsTableProps) => {
  const { columns, table } = useAssetsTable({
    data,
  });

  return (
    <>
      <DataTable table={table.table} columns={columns} className="p-0 mt-6" />
    </>
  );
};
