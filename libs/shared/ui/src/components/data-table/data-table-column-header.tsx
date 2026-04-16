import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';
import { cn } from '@erp/utils';
import { Button } from '../../primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return (
      <div data-slot="data-table-column-header" className={cn(className)}>
        {title}
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 data-[state=open]:bg-accent has-[>svg]:px-0 hover:bg-transparent"
          >
            <span>{title}</span>
            {column.getCanSort() && (
              <>
                {column.getIsSorted() === 'desc' ? (
                  <ArrowDown className="ml-2 size-4" />
                ) : column.getIsSorted() === 'asc' ? (
                  <ArrowUp className="ml-2 size-4" />
                ) : (
                  <ChevronsUpDown className="ml-2 size-4" />
                )}
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUp className="mr-2 size-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDown className="mr-2 size-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
              {column.getIsSorted() && (
                <DropdownMenuItem onClick={() => column.clearSorting()}>
                  <ChevronsUpDown className="mr-2 size-3.5 text-muted-foreground/70" />
                  Reset
                </DropdownMenuItem>
              )}
            </>
          )}
          {column.getCanSort() && column.getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {column.getCanHide() && (
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOff className="mr-2 size-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export { DataTableColumnHeader };
export type { DataTableColumnHeaderProps };
