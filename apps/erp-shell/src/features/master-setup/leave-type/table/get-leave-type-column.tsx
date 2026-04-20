import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { leaveTypeDataType } from '../../schema/LeaveTypeData';
import { IconButton } from '../../../../components/icon-button';

export function getLeaveTypeColumn(): ColumnDef<leaveTypeDataType>[] {
  return [
    {
      accessorKey: 'leavetype',
      header: 'Leave Type',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('leavetype')}</div>
      ),
    },
    {
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('code')}</div>
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
