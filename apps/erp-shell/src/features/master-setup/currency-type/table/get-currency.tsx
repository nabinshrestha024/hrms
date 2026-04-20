import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import type { CurrencyDataType } from '../../schema/CurrencyData';
import { IconButton } from '../../../../components/icon-button';

export function getCurrencyColumn(): ColumnDef<CurrencyDataType>[] {
  return [
    {
      accessorKey: 'currencyName',
      header: 'Currency Name',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('currencyName')}</div>
      ),
    },
    {
      accessorKey: 'currencySymbol',
      header: 'Currency Symbol',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('currencySymbol')}</div>
      ),
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('details')}</div>
      ),
    },

    {
      id: 'actions',
      header: () => <div className="text-left">Action</div>,
      cell: () => (
        <div className="flex items-center gap-2">
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
