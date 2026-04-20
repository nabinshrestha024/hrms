import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { JobLevelDataType } from '../../schema/JobLevelData';
import { IconButton } from '../../../../components/icon-button';

export function getJobLevelColumn(): ColumnDef<JobLevelDataType>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('name')}</div>
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
