import { type DocumentCategory } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useCategoryTable } from './use-category-table';

interface CategoryTableProps {
  data: DocumentCategory[];
  onEdit?: (branch: DocumentCategory) => void;
  onDelete?: (id: string) => void;
}

export const CategoryTable = ({
  data,
  onDelete,
  onEdit,
}: CategoryTableProps) => {
  const { columns, table } = useCategoryTable({ data, onEdit, onDelete });

  return (
    <div className="px-6 pb-19.5 bg-background">
      <DataTable table={table} columns={columns} />
    </div>
  );
};
