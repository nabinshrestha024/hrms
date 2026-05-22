import { type HolidayType } from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
interface ColumnActions {
  onEdit?: (holiday: HolidayType) => void;
  onDelete?: (id: string) => void;
}
export function getHolidayColumn(
  actions?: ColumnActions
): ColumnDef<HolidayType>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: row.original.color }}
            aria-hidden
          />
          <span>{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
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
