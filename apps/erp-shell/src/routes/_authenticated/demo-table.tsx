import {
  Badge,
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  useDataTable,
  type RowAction,
} from '@erp/ui';
import { formatCurrency, formatDate } from '@erp/utils';
import { createFileRoute } from '@tanstack/react-router';
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { Download, Eye, Pencil, Trash2 } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const Route = createFileRoute('/_authenticated/demo-table')({
  component: DemoTablePage,
  beforeLoad: () => ({ breadcrumb: 'Table Demo' }),
});

// ----- Types -----

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  role: string;
  salary: number;
  startDate: string;
}

// ----- Mock Data -----

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@demo.com',
    department: 'Engineering',
    status: 'active',
    role: 'Senior Engineer',
    salary: 125000,
    startDate: '2022-03-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@demo.com',
    department: 'Engineering',
    status: 'active',
    role: 'Staff Engineer',
    salary: 145000,
    startDate: '2021-06-01',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@demo.com',
    department: 'HR',
    status: 'active',
    role: 'HR Manager',
    salary: 95000,
    startDate: '2020-01-10',
  },
  {
    id: '4',
    name: 'Dave Brown',
    email: 'dave@demo.com',
    department: 'Finance',
    status: 'inactive',
    role: 'Accountant',
    salary: 85000,
    startDate: '2019-08-22',
  },
  {
    id: '5',
    name: 'Eve Davis',
    email: 'eve@demo.com',
    department: 'Marketing',
    status: 'active',
    role: 'Marketing Lead',
    salary: 105000,
    startDate: '2023-01-05',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@demo.com',
    department: 'Engineering',
    status: 'on_leave',
    role: 'Junior Engineer',
    salary: 75000,
    startDate: '2023-09-18',
  },
  {
    id: '7',
    name: 'Grace Wilson',
    email: 'grace@demo.com',
    department: 'Operations',
    status: 'active',
    role: 'Operations Manager',
    salary: 110000,
    startDate: '2021-11-30',
  },
  {
    id: '8',
    name: 'Henry Taylor',
    email: 'henry@demo.com',
    department: 'Engineering',
    status: 'active',
    role: 'Tech Lead',
    salary: 155000,
    startDate: '2020-04-12',
  },
  {
    id: '9',
    name: 'Ivy Anderson',
    email: 'ivy@demo.com',
    department: 'HR',
    status: 'active',
    role: 'Recruiter',
    salary: 72000,
    startDate: '2024-02-01',
  },
  {
    id: '10',
    name: 'Jack Thomas',
    email: 'jack@demo.com',
    department: 'Finance',
    status: 'active',
    role: 'CFO',
    salary: 195000,
    startDate: '2018-06-15',
  },
  {
    id: '11',
    name: 'Karen White',
    email: 'karen@demo.com',
    department: 'Marketing',
    status: 'inactive',
    role: 'Content Writer',
    salary: 65000,
    startDate: '2022-07-20',
  },
  {
    id: '12',
    name: 'Leo Martinez',
    email: 'leo@demo.com',
    department: 'Engineering',
    status: 'active',
    role: 'DevOps Engineer',
    salary: 130000,
    startDate: '2021-03-08',
  },
  {
    id: '13',
    name: 'Mia Garcia',
    email: 'mia@demo.com',
    department: 'Operations',
    status: 'on_leave',
    role: 'Office Manager',
    salary: 68000,
    startDate: '2023-05-14',
  },
  {
    id: '14',
    name: 'Noah Robinson',
    email: 'noah@demo.com',
    department: 'Engineering',
    status: 'active',
    role: 'QA Engineer',
    salary: 92000,
    startDate: '2022-10-01',
  },
  {
    id: '15',
    name: 'Olivia Clark',
    email: 'olivia@demo.com',
    department: 'HR',
    status: 'active',
    role: 'HR Director',
    salary: 140000,
    startDate: '2019-01-20',
  },
];

// ----- Status Badge -----

const statusConfig: Record<
  Employee['status'],
  { label: string; variant: 'success' | 'secondary' | 'warning' }
> = {
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'secondary' },
  on_leave: { label: 'On Leave', variant: 'warning' },
};

// ----- Column Definitions -----

const columns: ColumnDef<Employee, unknown>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.email}
        </div>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status];
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'salary',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm">
        {formatCurrency(row.original.salary)}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => formatDate(row.original.startDate, { format: 'medium' }),
    enableSorting: true,
  },
];

// ----- Row Actions -----

const rowActions: RowAction<Employee>[] = [
  {
    label: 'View',
    icon: Eye,
    onClick: (row: Employee) => alert(`View employee: ${row.name}`),
  },
  {
    label: 'Edit',
    icon: Pencil,
    onClick: (row: Employee) => alert(`Edit employee: ${row.name}`),
  },
  {
    label: 'Delete',
    icon: Trash2,
    onClick: (row: Employee) => alert(`Delete employee: ${row.name}`),
    variant: 'destructive',
    separator: true,
  },
];

// ----- Page Component -----

function DemoTablePage() {
  // URL-synced pagination via nuqs
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(10)
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault('')
  );
  const [sortOrder, setSortOrder] = useQueryState(
    'sortOrder',
    parseAsString.withDefault('')
  );
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));

  const { table } = useDataTable({
    data: MOCK_EMPLOYEES,
    columns,
    getRowId: (row: Employee) => row.id,
    enableRowSelection: true,
    initialPagination: { pageIndex: page - 1, pageSize },
    initialSorting: sortBy ? [{ id: sortBy, desc: sortOrder === 'desc' }] : [],
    onPaginationChange: (pagination: PaginationState) => {
      void setPage(pagination.pageIndex + 1);
      void setPageSize(pagination.pageSize);
    },
    onSortingChange: (sorting: SortingState) => {
      if (sorting.length > 0) {
        void setSortBy(sorting[0].id);
        void setSortOrder(sorting[0].desc ? 'desc' : 'asc');
      } else {
        void setSortBy(null);
        void setSortOrder(null);
      }
    },
  });

  // Sync URL search param → table global filter
  useEffect(() => {
    table.setGlobalFilter(search);
  }, [search, table]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">DataTable Demo</h1>
        <p className="text-muted-foreground">
          Employees table with sorting, pagination, row selection, row actions,
          and column visibility. Try sorting or changing pages — the URL updates
          automatically via nuqs.
        </p>
      </div>

      <DataTable
        table={table}
        columns={columns}
        onRowClick={(row: Employee) =>
          alert(`Clicked: ${row.name} (${row.role})`)
        }
        rowActions={rowActions}
        searchPlaceholder="Search employees..."
        enableRowSelection
        toolbar={
          <DataTableToolbar
            table={table}
            searchPlaceholder="Search employees..."
            searchValue={search}
            onSearchChange={(value: string) => {
              void setSearch(value || null);
              void setPage(1);
            }}
            actionSlot={
              <button
                className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                onClick={() => alert('Export clicked!')}
              >
                <Download className="size-4" />
                Export
              </button>
            }
          />
        }
      />
    </div>
  );
}
