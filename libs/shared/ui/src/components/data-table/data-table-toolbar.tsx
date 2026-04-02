import { X, Search } from 'lucide-react';
import type { Table } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { Button } from '../../primitives/button';
import { Input } from '../../primitives/input';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterSlot?: ReactNode;
  actionSlot?: ReactNode;
  enableColumnVisibility?: boolean;
}

function DataTableToolbar<TData>({
  table,
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filterSlot,
  actionSlot,
  enableColumnVisibility = true,
}: DataTableToolbarProps<TData>) {
  const isControlled = searchValue !== undefined && onSearchChange !== undefined;
  const currentSearchValue = isControlled
    ? searchValue
    : (table.getState().globalFilter as string) ?? '';

  const handleSearchChange = (value: string) => {
    if (isControlled) {
      onSearchChange(value);
    } else {
      table.setGlobalFilter(value);
    }
  };

  const isFiltered =
    currentSearchValue.length > 0 ||
    table.getState().columnFilters.length > 0;

  const handleReset = () => {
    handleSearchChange('');
    table.resetColumnFilters();
  };

  return (
    <div
      data-slot="data-table-toolbar"
      className="flex flex-wrap items-center justify-between gap-2"
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={currentSearchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-9 w-[150px] pl-8 lg:w-[250px]"
          />
        </div>
        {filterSlot}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actionSlot}
        {enableColumnVisibility && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}

export { DataTableToolbar };
export type { DataTableToolbarProps };
