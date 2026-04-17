import type { ColumnDef } from '@tanstack/react-table';
import type { LeaveRequest } from '../../schema/LeaveRequestData';
import { Eye } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import { Badge, DataTableColumnHeader, FormDialog } from '@erp/ui';
import { LeaveRequestDetail } from '../../leave-request/leave-request-detail';

export function getMyRequestColumn(): ColumnDef<LeaveRequest>[] {
  return [
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => {
        return <>{row.getValue('employeeName')}</>;
      },
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.getValue('branch')}</>,
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => <>{row.getValue('type')}</>,
    },
    {
      accessorKey: 'duration',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Duration" />
      ),
      cell: ({ row }) => <>{row.getValue('duration')}</>,
    },
    {
      accessorKey: 'totalDays',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Days" />
      ),
      cell: ({ row }) => <>{row.getValue('totalDays')}</>,
    },
    {
      accessorKey: 'requestedDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Requested Date" />
      ),
      cell: ({ row }) => <>{row.getValue('requestedDate')}</>,
    },
    {
      accessorKey: 'reason',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reason" />
      ),
      cell: ({ row }) => <>{row.getValue('reason')}</>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: (info) => {
        const value = info.getValue() as string;

        const isPending = value?.toLowerCase() === 'pending';
        const isApproved = value?.toLowerCase() === 'approved';
        const isRejected = value?.toLowerCase() === 'rejected';

        return (
          <>
            {isPending && <Badge variant="warning">Pending</Badge>}
            {isApproved && <Badge variant="secondary">Approved</Badge>}
            {isRejected && <Badge variant="destructive">Rejected</Badge>}
          </>
        );
      },
    },

    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => {
        const employeeId = row.original.employeeId;
        return (
          <div className="flex items-center gap-2">
            <FormDialog
              trigger={
                <IconButton variant="default">
                  <Eye className="text-[16px] text-foreground" />
                </IconButton>
              }
              title="Leave Request Details"
              size="lg"
            >
              <LeaveRequestDetail employeeId={employeeId} />
            </FormDialog>
          </div>
        );
      },
    },
  ];
}
