import { useServerTableState } from '@erp/ui';
import { useMemo } from 'react';
import { EmployeeDetailType } from '../../schema/TableData';
import { getEmployeeDetailColumns } from './get-employee-detail-column';

interface EmployeeTableProps {
  data: EmployeeDetailType[];
}

export function useEmployeeDetailTable({ data }: EmployeeTableProps) {
  const columns = useMemo(() => getEmployeeDetailColumns(), []);

  const tableState = useServerTableState<EmployeeDetailType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: EmployeeDetailType) => row.id,
  });

  return { ...tableState, columns };
}
