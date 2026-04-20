import { useServerTableState } from '@erp/ui';
import { getDirectoriesColumns } from './get-directories-column';
import { DirectoriesType } from '../schema/Directories';

interface DirectoriesTableProps {
  data: DirectoriesType[];
}

export function useDirectoriesTable({ data }: DirectoriesTableProps) {
  const columns = getDirectoriesColumns();

  const table = useServerTableState<DirectoriesType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.employeeID,
  });

  return {
    table,
    columns,
  };
}
