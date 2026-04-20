import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { HolidayDataType } from '../../schema/HolidayData';
import { IconButton } from '../../../../components/icon-button';

export function getHolidayColumn(): ColumnDef<HolidayDataType>[] {
  return [
    {
      accessorKey: 'leaveType',
      header: 'Leave Type',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('leaveType')}</div>
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
