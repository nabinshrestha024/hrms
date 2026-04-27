import { useServerTableState } from '@erp/ui';
import { VisibilityType } from '../../schema/VisibilityData';
import { getVisibilityColumns } from './get-visibility-column';

interface VisibilityTableProps {
  data: VisibilityType[];
}

export function useVisibilityTable({ data }: VisibilityTableProps) {
  const columns = getVisibilityColumns();

  const tableState = useServerTableState<VisibilityType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: VisibilityType) => row.employeeName,
  });

  return { ...tableState, columns };
}
