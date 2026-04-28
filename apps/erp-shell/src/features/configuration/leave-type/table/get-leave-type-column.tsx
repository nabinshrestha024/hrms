import {
  type LeaveApplicableTo,
  type LeavePolicy,
  type LeaveType,
} from '@erp/data-access';
import { DataTableColumnHeader } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';

/**
 * Format a structured `LeavePolicy` back into the original display string
 * ("Max N" / "No"). Keeps the table cells visually identical to the
 * legacy stringly-typed data while the underlying schema is structured.
 */
function formatPolicy(policy: LeavePolicy): string {
  if (!policy.enabled) return 'No';
  return policy.maxDays != null ? `Max ${policy.maxDays}` : 'Yes';
}

const APPLICABLE_TO_LABEL: Record<LeaveApplicableTo, string> = {
  all: 'All',
  female: 'Female',
  male: 'Male',
};

export function getConfigurationLeaveTypeColumn(): ColumnDef<LeaveType>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Leave Type" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'daysPerYear',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Days" />
      ),
      cell: ({ row }) => <>{row.getValue('daysPerYear')}</>,
    },
    {
      accessorKey: 'applicableTo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Applicable To" />
      ),
      cell: ({ row }) => <>{APPLICABLE_TO_LABEL[row.original.applicableTo]}</>,
    },
    {
      accessorKey: 'carryOver',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Carry Over" />
      ),
      cell: ({ row }) => <>{formatPolicy(row.original.carryOver)}</>,
    },
    {
      accessorKey: 'encashable',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Encashable" />
      ),
      cell: ({ row }) => <>{formatPolicy(row.original.encashable)}</>,
    },
    {
      accessorKey: 'paid',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid" />
      ),
      cell: ({ row }) => <>{row.original.paid ? 'Yes' : 'No'}</>,
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
