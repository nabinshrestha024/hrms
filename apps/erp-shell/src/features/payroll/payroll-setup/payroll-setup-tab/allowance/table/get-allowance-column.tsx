import { Badge, DataTableColumnHeader, Switch } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { Allowance } from '../../../../../../mocks/modules/payroll-setup-allowance/seed';
import { IconButton } from '../../../../../../components/icon-button';

export function getAllowanceColumns(): ColumnDef<Allowance>[] {
  return [
    {
      id: 'name',
      accessorFn: (row) => `${row.name} ${row.description}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span>{row.original.name} </span>
          <span>{row.original.description}</span>
        </div>
      ),
    },
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <>{row.getValue('code')}</>,
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <>
            {type === 'Taxable' && <Badge variant="destructive">Taxable</Badge>}
            {type === 'Partially Taxable' && (
              <Badge variant="orange">Partially Taxable</Badge>
            )}
            {type === 'Non-Taxable' && (
              <Badge variant="secondary">Non-Taxable</Badge>
            )}
          </>
        );
      },
    },
    {
      accessorKey: 'calculation',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Calculation" />
      ),
      cell: ({ row }) => <>{row.original.calculation}</>,
    },
    {
      accessorKey: 'taxExemptLimit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tax Exempt Limit" />
      ),
      cell: ({ row }) => <>{row.original.taxExemptLimit}</>,
    },
    {
      accessorKey: 'active',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Active" />
      ),
      cell: ({ row }) => (
        <div className="cursor-pointer">
          <Switch checked={row.original.active} />
        </div>
      ),
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <IconButton variant="default">
              <Edit className="w-4 h-4 text-black font-bold" />
            </IconButton>
            <IconButton variant="destructive">
              <Trash2 className="w-4 h-4 text-badge-text-3 font-bold" />
            </IconButton>
          </div>
        );
      },
    },
  ];
}
