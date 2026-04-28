import type { Employee } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { getEmployeeColumns } from './get-employee-column';

interface EmployeeTableProps {
  data: Employee[];
}

export function useEmployeeTable({ data }: EmployeeTableProps) {
  const navigate = useNavigate();

  const columns = useMemo(() => getEmployeeColumns({ navigate }), [navigate]);

  const tableState = useServerTableState<Employee>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Employee) => row.id,
  });

  return { ...tableState, columns };
}
