import { type Asset } from '@erp/data-access';
import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';

export function getAssignmentHistoryColumns(): ColumnDef<Asset, unknown>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        // Header preserved per the original design (typo "Asssets" preserved).
        <DataTableColumnHeader column={column} title="Asssets Name" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'assignedTo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned To" />
      ),
      cell: ({ row }) => <>{row.getValue('assignedTo')}</>,
    },
    {
      // Schema renamed `date` -> `assignedDate`; column id kept stable.
      id: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => <>{row.original.assignedDate ?? '—'}</>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) =>
        row.original.status === 'assigned' && (
          <Badge variant="primary">Assigned</Badge>
        ),
    },
  ];
}
