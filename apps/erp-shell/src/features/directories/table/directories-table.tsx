import { DataTable } from '@erp/ui';
import { DirectoriesType } from '../schema/Directories';
import { useDirectoriesTable } from './use-directories-table';

interface DirectoriesTableProps {
  data: DirectoriesType[];
}

export const DirectoriesTable = ({ data }: DirectoriesTableProps) => {
  const { columns, table } = useDirectoriesTable({
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
