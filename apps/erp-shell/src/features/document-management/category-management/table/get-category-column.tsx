import { type DocumentCategory } from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';

function formatCreatedDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toISOString().slice(0, 10);
}

export function getCategoryColumns(): ColumnDef<DocumentCategory, unknown>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'documentCount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Document" />
      ),
      cell: ({ row }) => <>{row.getValue('documentCount')}</>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => <>{formatCreatedDate(row.original.createdAt)}</>,
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
