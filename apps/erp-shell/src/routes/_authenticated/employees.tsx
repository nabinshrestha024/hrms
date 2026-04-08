import { DataTable, useDialog } from '@erp/ui';
import type { Employee } from '@erp/data-access';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  AddEmployeeDialog,
  AssignAccessDialog,
  columns,
  EmployeeCardGrid,
  EmployeeToolbar,
  GridPagination,
  useEmployeeTable,
} from '../../features/employees';

export const Route = createFileRoute('/_authenticated/employees')({
  component: EmployeesPage,
  beforeLoad: () => ({ breadcrumb: 'Employee Management' }),
});

function EmployeesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const addDialog = useDialog();
  const accessDialog = useDialog<string>();

  const {
    employees,
    totalCount,
    isLoading,
    table,
    rowActions,
    page,
    pageSize,
    search,
    branch,
    setPage,
    setPageSize,
    setSearch,
    setBranch,
  } = useEmployeeTable(navigate, {
    onAssignAccess: (name) => accessDialog.open(name),
  });

  return (
    <>
      <div className="max-h-[calc(100vh-120px)] overflow-auto">
        <EmployeeToolbar
          search={search}
          onSearchChange={(v) => {
            void setSearch(v || null);
            void setPage(1);
          }}
          branch={branch}
          onBranchChange={(v) => {
            void setBranch(v === 'all' ? null : v);
            void setPage(1);
          }}
          view={view}
          onViewChange={setView}
          onAddClick={addDialog.open}
        />

        {view === 'list' ? (
          <div className="px-6">
            <DataTable
              table={table}
              columns={columns}
              loading={isLoading}
              onRowClick={(row: Employee) =>
                navigate({ to: '/employees/$id', params: { id: row.id } })
              }
              rowActions={rowActions}
            />
          </div>
        ) : (
          <>
            <EmployeeCardGrid
              employees={employees}
              onNavigate={(id) =>
                navigate({ to: '/employees/$id', params: { id } })
              }
            />
            <GridPagination
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={(p) => void setPage(p)}
              onPageSizeChange={(s) => {
                void setPageSize(s);
                void setPage(1);
              }}
            />
          </>
        )}
      </div>

      <AddEmployeeDialog {...addDialog.props} />
      <AssignAccessDialog
        {...accessDialog.props}
        employeeName={accessDialog.data ?? ''}
      />
    </>
  );
}
