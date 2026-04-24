import { Badge, DataTableColumnHeader, FormDialog } from '@erp/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { IconButton } from '../../../../components/icon-button';
import { SalaryStructureType } from '../../schema/SalaryStructureData';
import { SalaryStructureForm } from '../salary-structure-form';

export function getSalaryStructureColumns(): ColumnDef<SalaryStructureType>[] {
  return [
    {
      accessorKey: 'employeeName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee Name" />
      ),
      cell: ({ row }) => <>{row.original.employeeName}</>,
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Department" />
      ),
      cell: ({ row }) => <>{row.getValue('department')}</>,
    },
    {
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
      cell: ({ row }) => <>{row.original.branch}</>,
    },
    {
      accessorKey: 'position',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Position" />
      ),
      cell: ({ row }) => <>{row.original.position}</>,
    },
    {
      accessorKey: 'grossSalary',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gross Salary" />
      ),
      cell: ({ row }) => <>{row.original.grossSalary || '-'}</>,
    },
    {
      accessorKey: 'sandwichRule',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sandwich Rule" />
      ),
      cell: ({ row }) => (
        <Badge variant="default">
          {row.original.sandwichRule || 'Not set'}
        </Badge>
      ),
    },

    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const name = row.getValue('employeeName');
        return (
          <FormDialog
            trigger={
              <IconButton variant="default">
                <Settings2 className="w-4 h-4 text-foreground" />{' '}
              </IconButton>
            }
            title="Salary Structure - "
            size="lg"
            okText="Save Structure"
            cancelText="Cancel"
            dialogClassName="sm:max-w-[765px] max-h-[90vh]"
            componentClassName="p-4"
          >
            <SalaryStructureForm />
          </FormDialog>
        );
      },
    },
  ];
}
