import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import type { AttendanceListRecord } from '../../schema/AttendanceListData';
import { DataTableColumnHeader } from '@erp/ui';

export function getAttendanceHistoryColumn(
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<AttendanceListRecord>[] {
  return [
    {
      accessorKey: 'employeeId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee ID" />
      ),
      cell: ({ row }) => <>{row.getValue('employeeId')}</>,
    },
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => <>{row.getValue('employeeName')}</>,
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.getValue('branch')}</>,
    },

    {
      accessorKey: 'shift',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Shift" />
      ),
      cell: ({ row }) => <>{row.getValue('shift')}</>,
    },

    {
      accessorKey: 'workType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Work Type" />
      ),
      cell: ({ row }) => <>{row.getValue('workType')}</>,
    },

    {
      accessorKey: 'employeeType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Type" />
      ),
      cell: ({ row }) => <>{row.getValue('employeeType')}</>,
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: () => (
        <IconButton variant="default" onClick={() => setShowTable(true)}>
          <Eye className="w-4 h-4 text-foreground " />
        </IconButton>
      ),
    },
  ];
}
