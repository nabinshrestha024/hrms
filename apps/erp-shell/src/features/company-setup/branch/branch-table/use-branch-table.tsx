import type { Branch } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getBranchColumns } from './get-column';

interface BranchTableProps {
  data: Branch[];
  onEdit?: (branch: Branch) => void;
  onDelete?: (id: string) => void;
}

export function useBranchTable({ data, onEdit, onDelete }: BranchTableProps) {
  const columns = getBranchColumns({ onEdit, onDelete });

  const tableState = useServerTableState<Branch>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Branch) => row.branchId,
  });

  return { ...tableState, columns };
}
