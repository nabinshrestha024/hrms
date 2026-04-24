import { Badge, DataTableColumnHeader, HRInput } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { EmployeeDetailType } from '../../schema/TableData';
import { InitialsCard } from '../../../../components/initial-avatar';
import { IconButton } from '../../../../components/icon-button';

export function getEmployeeDetailColumns(): ColumnDef<EmployeeDetailType>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <HRInput
          type="checkbox"
          inputClassName="px-0 py-0 border-none rounded-none bg-transparent shadow-none"
          checked={table.getIsAllRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        />
      ),
      cell: ({ row }) => (
        <HRInput
          type="checkbox"
          inputClassName="px-0 py-0 border-none rounded-none bg-transparent shadow-none"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
        />
      ),
    },
    {
      id: 'name',
      accessorFn: (row) => `${row.name} ${row.role}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <InitialsCard
              name={row.original.name}
              className="bg-black w-4 h-4"
            />
            <div className="flex flex-col gap-1 items-start">
              <span>{row.original.name}</span>
              <span> {row.original.role}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => <div>{row.getValue('department')}</div>,
    },
    {
      accessorKey: 'basicSalary',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Basic Salary" />
      ),
      cell: ({ row }) => <div>{row.original.basicSalary || '-'}</div>,
    },
    {
      accessorKey: 'grossSalary',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gross Salary" />
      ),
      cell: ({ row }) => <div>{row.original.grossSalary || 'Not set'}</div>,
    },

    {
      id: 'attendance',
      accessorFn: (row) =>
        `${row.absentDays} ${row.lateMinutes} ${row.overtimeHours}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => {
        const absentDays = row.original.absentDays;
        const late = row.original.lateMinutes;
        const overtime = row.original.overtimeHours;

        return (
          <div className="flex gap-1">
            {absentDays && (
              <Badge variant="destructive">Absent: {absentDays}</Badge>
            )}
            {late && <Badge variant="default">Late: {late}</Badge>}
            {overtime && <Badge variant="default">OT: {overtime}</Badge>}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: () => {
        return (
          <IconButton variant="default">
            <Settings2 className="w-4 h-4 text-foreground" />{' '}
          </IconButton>
        );
      },
    },
  ];
}
