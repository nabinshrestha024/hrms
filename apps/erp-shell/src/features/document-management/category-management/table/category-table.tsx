import { DataTable } from '@erp/ui';
import { CategoryType } from '../../schema/CategoryData';
import { useCategoryTable } from './use-category-table';

interface CategoryTableProps {
  data: CategoryType[];
}

export const CategoryTable = ({ data }: CategoryTableProps) => {
  const { columns, table } = useCategoryTable({
    data,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
