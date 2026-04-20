import { DataTable } from '@erp/ui';
import { AssetType } from '../../schema/AllAssetsData';
import { useAssetsTable } from './use-all-assets-table';

interface AssetsTableProps {
  data: AssetType[];
}

export const AssetsTable = ({ data }: AssetsTableProps) => {
  const { columns, table } = useAssetsTable({
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
