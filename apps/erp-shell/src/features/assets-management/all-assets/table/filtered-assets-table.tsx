import { type Asset } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useAssetsTable } from './use-all-assets-table';

interface AssetsTableProps {
  data: Asset[];
}

export const FilteredAssetsTable = ({ data }: AssetsTableProps) => {
  const { columns, table } = useAssetsTable({
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
