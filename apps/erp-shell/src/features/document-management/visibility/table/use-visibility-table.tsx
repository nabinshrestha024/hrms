import { type EmployeeDocument } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getVisibilityColumns } from './get-visibility-column';

interface VisibilityTableProps {
  data: EmployeeDocument[];
}

export function useVisibilityTable({ data }: VisibilityTableProps) {
  const columns = getVisibilityColumns();

  const tableState = useServerTableState<EmployeeDocument>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return { ...tableState, columns };
}
