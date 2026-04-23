import { Badge, DataTableColumnHeader, Switch } from '@erp/ui';
import { ColumnDef } from '@tanstack/react-table';
import { SandwichRuleTableType } from '../../schema/SandwichRuleData';

export function getSandwichRuleColumn(): ColumnDef<
  SandwichRuleTableType,
  unknown
>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Leave Type" />
      ),
      cell: ({ row }) => <>{row.getValue('name')}</>,
    },
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <>{row.getValue('code')}</>,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => <>{row.getValue('description')}</>,
    },
    {
      accessorKey: 'sandwichRule',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sandwich Rule" />
      ),
      cell: ({ row }) => {
        const value = Boolean(row.getValue('sandwichRule'));

        return (
          <div className="cursor-pointer">
            <Switch checked={value} />
          </div>
        );
      },
    },
    {
      accessorKey: 'paid',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid" />
      ),
      cell: ({ row }) => {
        const value = row.getValue('paid');

        if (value === 'Disabled')
          return <Badge variant="default">Disabled</Badge>;
        if (value === 'Enabled')
          return <Badge variant="secondary">Enabled</Badge>;

        return null;
      },
    },
  ];
}
