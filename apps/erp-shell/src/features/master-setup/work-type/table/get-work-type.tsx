import { type WorkType } from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';

export function getWorkTypeColumn(): ColumnDef<WorkType>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Work Type" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      // Schema field is `description`; column label kept as "Details"
      // to preserve the original design.
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => <>{row.getValue('description') ?? '—'}</>,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="flex items-center gap-2 justify-center">
          <IconButton variant="default">
            <Edit className="w-4 h-4" />
          </IconButton>
          <IconButton variant="destructive">
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      ),
    },
  ];
}
