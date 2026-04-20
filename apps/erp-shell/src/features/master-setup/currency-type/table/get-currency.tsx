import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import type { CurrencyDataType } from '../../schema/CurrencyData';
import { IconButton } from '../../../../components/icon-button';
import { DataTableColumnHeader } from '@erp/ui';

export function getCurrencyColumn(): ColumnDef<CurrencyDataType>[] {
  return [
    {
      accessorKey: 'currencyName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Currency Name" />
      ),
      cell: ({ row }) => <>{row.getValue('currencyName')}</>,
    },
    {
      accessorKey: 'currencySymbol',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Currency Symbol" />
      ),
      cell: ({ row }) => <>{row.getValue('currencySymbol')}</>,
    },
    {
      accessorKey: 'details',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Details" />
      ),
      cell: ({ row }) => <>{row.getValue('details')}</>,
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
