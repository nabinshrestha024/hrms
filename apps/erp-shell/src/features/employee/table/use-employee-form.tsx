import type { Employee } from '@erp/data-access';
import { useDialogFormStore, useServerTableState } from '@erp/ui';
import { useNavigate } from '@tanstack/react-router';
import { useMemo } from 'react';
import { getEmployeeColumns } from './getEmployeeColumn';

interface EmployeeTableProps {
  data: Employee[];
}

export function useEmployeeTable({ data }: EmployeeTableProps) {
  const { onOpen } = useDialogFormStore();
  const navigate = useNavigate();

  const columns = useMemo(
    () => getEmployeeColumns({ onOpen, navigate }),
    [onOpen, navigate]
  );

  return useServerTableState<Employee>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Employee) => row.id,
  });
}
