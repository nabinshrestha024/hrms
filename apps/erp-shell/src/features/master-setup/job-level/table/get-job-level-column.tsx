import { type JobLevel } from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';

interface ColumnActions {
  onEdit?: (jobLevel: JobLevel) => void;
  onDelete?: (id: string) => void;
}

export function getJobLevelColumn(
  actions?: ColumnActions
): ColumnDef<JobLevel>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2 justify-center">
          <IconButton
            variant="default"
            tooltip="Edit"
            onClick={() => actions?.onEdit?.(row.original)}
          >
            <Edit className="w-4 h-4" />
          </IconButton>
          <IconButton
            variant="destructive"
            tooltip="Delete"
            onClick={() => actions?.onDelete?.(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </IconButton>
        </div>
      ),
    },
  ];
}
