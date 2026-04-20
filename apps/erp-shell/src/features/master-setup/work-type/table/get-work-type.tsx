import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { WorkTypeDataType } from '../../schema/WorkTypeData';
import { IconButton } from '../../../../components/icon-button';
import { DataTableColumnHeader } from '@erp/ui';

export function getWorkTypeColumn(): ColumnDef<WorkTypeDataType>[] {
  return [
    {
      accessorKey: 'worktype',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Work Type" />
      ),
      cell: ({ row }) => <>{row.getValue('worktype')}</>,
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
