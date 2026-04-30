import { useServerTableState } from '@erp/ui';
import { useMemo } from 'react';
import { SalaryStructureType } from '../../schema/SalaryStructureData';
import { getSalaryStructureColumns } from './get-salary-structure-column';

interface SalaryStructureTableProps {
  data: SalaryStructureType[];
}

export function useSalaryStructureTable({ data }: SalaryStructureTableProps) {
  const columns = useMemo(() => getSalaryStructureColumns(), []);

  const tableState = useServerTableState<SalaryStructureType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: SalaryStructureType) => row.employeeName,
  });

  return { ...tableState, columns };
}
