import { DataTableColumnHeader } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { CategoryType } from '../../schema/CategoryData';
import { IconButton } from '../../../../components/icon-button';
import { Edit, Trash2 } from 'lucide-react';

export function getCategoryColumns(): ColumnDef<CategoryType, unknown>[] {
  return [
    {
      accessorKey: 'documentCategory',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => <>{row.getValue('documentCategory')}</>,
    },
    {
      accessorKey: 'numOfDocs',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document" />
      ),
      cell: ({ row }) => <>{row.getValue('numOfDocs')}</>,
    },

    {
      accessorKey: 'createdDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => <>{row.getValue('createdDate')}</>,
    },
    {
      accessorKey: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 items-center justify-center">
          <IconButton variant="default">
            <Edit className="w-4 h-4 text-black font-bold" />
          </IconButton>
          <IconButton variant="destructive">
            <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
          </IconButton>
        </div>
      ),
    },
  ];
}
