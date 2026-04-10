# Server-Driven Tables

The standard pattern for any list page with sortable, paginated, searchable data.

## TL;DR

Use `useServerTableState` from `@erp/ui`. It wraps `useDataTable` (TanStack Table)
with URL-synced query params for `page`, `pageSize`, `sortBy`, `sortOrder`,
and `search` — and gives you back the table instance plus the current state
to feed into your data-fetching hook.

A new server-driven table is **~20 lines**. Before this hook, it was ~90.

---

## Minimal example

```tsx
import { DataTable, useServerTableState } from '@erp/ui';
import { useEmployees, type Employee } from '@erp/data-access';
import { columns } from './columns';

function EmployeeListPage() {
  const tableState = useServerTableState<Employee>({
    data: [], // filled below
    totalCount: 0, // filled below
    columns,
    getRowId: (row: Employee) => row.id,
  });

  // Pass URL state into the data fetch
  const { data: response } = useEmployees({
    page: tableState.page,
    pageSize: tableState.pageSize,
    sortBy: tableState.sortBy || undefined,
    sortOrder: (tableState.sortOrder as 'asc' | 'desc') || undefined,
    search: tableState.search || undefined,
  });

  // Re-pass the response back into the hook
  // (or restructure to do this in one call — see "Recommended pattern" below)
  const employees = response?.data ?? [];
  const totalCount = response?.total ?? 0;

  return <DataTable table={tableState.table} columns={columns} />;
}
```

---

## Recommended pattern: extract a custom hook

For each table, create a wrapper hook that combines `useServerTableState` with
your data fetcher:

```tsx
// use-employee-table.ts
import { useEmployees, type Employee } from '@erp/data-access';
import { useServerTableState } from '@erp/ui';
import { columns } from './columns';

export function useEmployeeTable() {
  // 1. Read URL state (initial pass — empty data)
  const initialState = useServerTableState<Employee>({
    data: [],
    totalCount: 0,
    columns,
    getRowId: (row: Employee) => row.id,
  });

  // 2. Fetch with URL state
  const { data: response, isLoading } = useEmployees({
    page: initialState.page,
    pageSize: initialState.pageSize,
    sortBy: initialState.sortBy || undefined,
    sortOrder: (initialState.sortOrder as 'asc' | 'desc') || undefined,
    search: initialState.search || undefined,
  });

  // 3. Re-build the table with fetched data
  const tableState = useServerTableState<Employee>({
    data: response?.data ?? [],
    totalCount: response?.total ?? 0,
    columns,
    getRowId: (row: Employee) => row.id,
  });

  return { ...tableState, isLoading };
}
```

Then in the component:

```tsx
function EmployeesPage() {
  const { table, isLoading, search, setSearch } = useEmployeeTable();

  return (
    <>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <DataTable table={table} columns={columns} loading={isLoading} />
    </>
  );
}
```

> **Note:** Calling `useServerTableState` twice is fine — the URL state is the
> source of truth and the second call just reuses it. There's a smarter
> single-pass version on the roadmap.

---

## When data is already in memory (client-side filtering)

If you're filtering a small in-memory array (like the `branch-management.tsx`
case where we fetch all 100 branches once), still use `useServerTableState`
but pass the array as `data` and let it handle pagination locally:

```tsx
// branch-table/use-branch-table.tsx
import { useServerTableState } from '@erp/ui';
import type { Branch } from '@erp/data-access';
import { getBranchColumns } from './get-column';

export function useBranchTable({
  data,
  onEdit,
  onDelete,
}: {
  data: Branch[];
  onEdit?: (b: Branch) => void;
  onDelete?: (id: string) => void;
}) {
  const columns = getBranchColumns({ onEdit, onDelete });

  return useServerTableState<Branch>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Branch) => row.id,
  });
}
```

The hook still wires URL state for `page`, `pageSize`, etc. — but since the
parent already fetched all data, sorting and pagination happen client-side.

---

## Props reference

### `useServerTableState<TData>(options)`

| Option       | Type                          | Required | Notes                                                                       |
| ------------ | ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `data`       | `TData[]`                     | ✓        | Row data from your fetcher.                                                 |
| `totalCount` | `number`                      | ✓        | Total row count from the server response. Used for `pageCount` calculation. |
| `columns`    | `ColumnDef<TData, unknown>[]` | ✓        | TanStack Table column definitions.                                          |
| `getRowId`   | `(row: TData) => string`      | ✓        | Stable row identity — usually `(row) => row.id`.                            |

### Return value

| Field                                                                                        | Type                                                  | Notes                                                          |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| `table`                                                                                      | `Table<TData>`                                        | TanStack Table instance — pass to `<DataTable table={table}>`. |
| `page`                                                                                       | `number`                                              | Current page (1-indexed).                                      |
| `pageSize`                                                                                   | `number`                                              | Current page size.                                             |
| `sortBy`                                                                                     | `string`                                              | Current sort column id, or `''`.                               |
| `sortOrder`                                                                                  | `string`                                              | `'asc'`, `'desc'`, or `''`.                                    |
| `search`                                                                                     | `string`                                              | Current search query, or `''`.                                 |
| `setPage`                                                                                    | `(value: number \| null) => Promise<URLSearchParams>` | Update page.                                                   |
| `setPageSize`                                                                                | `(value: number \| null) => Promise<URLSearchParams>` | Update page size.                                              |
| `setSortBy`                                                                                  | `(value: string \| null) => Promise<URLSearchParams>` | Update sort column.                                            |
| `setSortOrder`                                                                               | `(value: string \| null) => Promise<URLSearchParams>` | Update sort order.                                             |
| `setSearch`                                                                                  | `(value: string \| null) => Promise<URLSearchParams>` | Update search.                                                 |
| `pagination`, `sorting`, `columnFilters`, `rowSelection`, `columnVisibility`, `selectedRows` | (from `useDataTable`)                                 | TanStack Table state.                                          |

URL params used:

- `?page=1`
- `?pageSize=10`
- `?sortBy=createdAt`
- `?sortOrder=desc`
- `?q=search+text` (the search param is named `q` in the URL)

---

## Defining columns

Columns are plain TanStack Table column definitions. Use the
`DataTableColumnHeader` helper for sortable headers:

```tsx
// columns.tsx
import { type ColumnDef } from '@tanstack/react-table';
import { Badge, DataTableColumnHeader } from '@erp/ui';
import type { Employee } from '@erp/data-access';

export const columns: ColumnDef<Employee, unknown>[] = [
  {
    accessorKey: 'employeeId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee ID" />
    ),
    cell: ({ row }) => row.original.employeeId ?? '-',
  },
  {
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return status === 'active' ? (
        <Badge variant="secondary">Active</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      );
    },
  },
];
```

### Action columns with callbacks

For row actions (edit, delete), accept callbacks via a column factory:

```tsx
interface ColumnActions {
  onEdit?: (employee: Employee) => void;
  onDelete?: (id: string) => void;
}

export function getEmployeeColumns(
  actions?: ColumnActions
): ColumnDef<Employee, unknown>[] {
  return [
    // ... data columns ...
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Edit"
            onClick={() => actions?.onEdit?.(row.original)}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Delete"
            onClick={() => actions?.onDelete?.(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];
}
```

Pass the callbacks from the parent:

```tsx
const columns = useMemo(
  () => getEmployeeColumns({ onEdit: handleEdit, onDelete: handleDelete }),
  [handleEdit, handleDelete]
);
```

---

## Common mistakes

### 1. Forgetting to memoize columns when they take callbacks

```tsx
// ❌ new column array on every render → table re-creates internally
const columns = getEmployeeColumns({ onEdit, onDelete });

// ✅ stable reference
const columns = useMemo(
  () => getEmployeeColumns({ onEdit, onDelete }),
  [onEdit, onDelete]
);
```

### 2. Using array index as `getRowId`

```tsx
// ❌ row identity changes when the list re-orders
getRowId: (_, index) => String(index);

// ✅ stable database id
getRowId: (row: Employee) => row.id;
```

### 3. Not passing URL state to the data fetcher

If you forget this, sorting/paging in the table won't trigger a refetch — the
table just slices the same data locally:

```tsx
// ❌ fetcher ignores URL state → table can't actually paginate the server
const { data } = useEmployees();
const tableState = useServerTableState({ data: data?.data ?? [], ... });

// ✅ fetcher uses URL state → server-driven
const initial = useServerTableState({ data: [], totalCount: 0, columns, getRowId });
const { data } = useEmployees({
  page: initial.page,
  pageSize: initial.pageSize,
  sortBy: initial.sortBy || undefined,
  sortOrder: initial.sortOrder || undefined,
  search: initial.search || undefined,
});
```

### 4. Mixing `manualPagination: true` with client-side data

`useServerTableState` sets `manualPagination/Sorting/Filtering: true` because
it expects the parent to refetch data when state changes. If you forget to
wire the data fetcher, the table just shows the same page over and over.

If you have client-side data (already fetched), don't worry — the hook handles
it as long as you pass the full array as `data` and `data.length` as
`totalCount`. The table will paginate locally.

---

## Real examples in the codebase

| File                                                                                 | Pattern                                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------- |
| `apps/erp-shell/src/features/employee/table/use-employee-form.tsx`                   | Server-driven employee table                  |
| `apps/erp-shell/src/features/company-setup/branch/branch-table/use-branch-table.tsx` | Client-side branch table (parent fetches all) |

Read these files when you need a working reference.
