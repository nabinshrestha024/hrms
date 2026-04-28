import { type DocumentCategory } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { getCategoryColumns } from './get-category-column';

interface CategoryTableProps {
  data: DocumentCategory[];
}

export function useCategoryTable({ data }: CategoryTableProps) {
  const columns = getCategoryColumns();

  const tableState = useServerTableState<DocumentCategory>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.id,
  });

  return { ...tableState, columns };
}
