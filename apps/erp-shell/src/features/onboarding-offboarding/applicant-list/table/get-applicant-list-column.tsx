import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { UserCheck, UserX } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import { Candidate } from '../../schema/ApplicantListData';

export function getApplicantListColumns(): ColumnDef<Candidate, unknown>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Candidate Name" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email Address" />
      ),
      cell: ({ row }) => <>{row.getValue('email')}</>,
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mobile Number" />
      ),
      cell: ({ row }) => <>{row.getValue('phone')}</>,
    },
    {
      accessorKey: 'cv',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CV Attachment" />
      ),
      cell: ({ row }) => (
        <div className="text-card-text underline underline-offset-3 underline-card-text cursor-pointer">
          {row.getValue('cv')}
        </div>
      ),
    },
    {
      accessorKey: 'position',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Position" />
      ),
      cell: ({ row }) => (
        <div className="truncate w-30">{row.getValue('position')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('status');
        return (
          <>
            {value === 'Selected' && (
              <Badge variant="secondary">Selected</Badge>
            )}
            {value === 'Rejected' && (
              <Badge variant="destructive">Rejected</Badge>
            )}
            {value === 'Shortlisted' && (
              <Badge variant="warning">Shortlisted</Badge>
            )}
          </>
        );
      },
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 items-center justify-center">
          <IconButton type="button" variant="secondary">
            <UserCheck className="w-4 h-4 text-badge-text-7 font-bold" />
          </IconButton>
          <IconButton type="button" variant="destructive">
            <UserX className="w-4 h-4 text-badge-text-3 font-bold" />
          </IconButton>
        </div>
      ),
    },
  ];
}
