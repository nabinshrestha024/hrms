import { useServerTableState } from '@erp/ui';
import { useMemo } from 'react';
import { getEmployeeDetailColumns } from './get-employee-detail-column';
import { GeneratePayroll } from '@erp/data-access';

interface EmployeeTableProps {
  data: GeneratePayroll[];
}

export function useEmployeeDetailTable({ data }: EmployeeTableProps) {
  const columns = useMemo(() => getEmployeeDetailColumns(), []);

  const tableState = useServerTableState<GeneratePayroll>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: GeneratePayroll) => row.id,
  });

  return { ...tableState, columns };
}
