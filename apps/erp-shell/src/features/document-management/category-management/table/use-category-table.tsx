import { type DocumentCategory } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getCategoryColumns } from './get-category-column';

interface CategoryTableProps {
  data: DocumentCategory[];
  onEdit?: (branch: DocumentCategory) => void;
  onDelete?: (id: string) => void;
}

export function useCategoryTable({
  data,
  onDelete,
  onEdit,
}: CategoryTableProps) {
  const columns = getCategoryColumns({ onEdit, onDelete });

  const tableState = useServerTableState<DocumentCategory>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return { ...tableState, columns };
}
