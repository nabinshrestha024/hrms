import { useServerTableState } from '@erp/ui';
import { CategoryType } from '../../schema/CategoryData';
import { getCategoryColumns } from './get-category-column';

interface CategoryTableProps {
  data: CategoryType[];
}

export function useCategoryTable({ data }: CategoryTableProps) {
  const columns = getCategoryColumns();

  return useServerTableState<CategoryType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: CategoryType) => row.documentCategory,
  });
}
