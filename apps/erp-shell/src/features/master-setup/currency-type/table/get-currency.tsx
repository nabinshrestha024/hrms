import { type Currency } from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
interface ColumnActions {
  onEdit?: (currency: Currency) => void;
  onDelete?: (id: string) => void;
}
export function getCurrencyColumn(
  actions?: ColumnActions
): ColumnDef<Currency>[] {
  return [
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <>{row.getValue('code')}</>,
    },
    {
      accessorKey: 'symbol',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Symbol" />
      ),
      cell: ({ row }) => <>{row.getValue('symbol')}</>,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
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
