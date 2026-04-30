import { useServerTableState } from '@erp/ui';
import { useMemo } from 'react';
import { getAllowanceColumns } from './get-allowance-column';
import { Allowance } from '../../../../../../mocks/modules/payroll-setup-allowance/seed';

interface AllowanceTableProps {
  data: Allowance[];
}

export function useAllowanceTable({ data }: AllowanceTableProps) {
  const columns = useMemo(() => getAllowanceColumns(), []);

  const tableState = useServerTableState<Allowance>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Allowance) => row.name,
  });

  return { ...tableState, columns };
}
