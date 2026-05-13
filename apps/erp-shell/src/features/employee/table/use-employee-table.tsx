import type { Employee } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { getEmployeeColumns } from './get-employee-column';

interface ColumnActions {
  onBlock?: (id: string) => void;
  onDelete?: (id: string) => void;
}
interface EmployeeTableProps {
  data: Employee[];
  actions?: ColumnActions;
}

export function useEmployeeTable({ data, actions }: EmployeeTableProps) {
  const navigate = useNavigate();

  const columns = useMemo(
    () => getEmployeeColumns({ navigate, actions }),
    [navigate, actions]
  );

  const tableState = useServerTableState<Employee>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Employee) => row.id,
  });

  return { ...tableState, columns };
}
