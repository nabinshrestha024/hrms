import { MoreHorizontal, type LucideIcon } from 'lucide-react';
import { Button } from '../../primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';
import { cn } from '@erp/utils';

export interface RowAction<TData> {
  label: string;
  icon?: LucideIcon;
  onClick?: (row: TData) => void;
  variant?: 'default' | 'destructive';
  hidden?: (row: TData) => boolean;
  separator?: boolean;
}

interface DataTableRowActionsProps<TData> {
  row: TData;
  actions: RowAction<TData>[];
}

function DataTableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const visibleActions = actions.filter(
    (action) => !action.hidden || !action.hidden(row)
  );

  if (visibleActions.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 data-[state=open]:bg-muted"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {visibleActions.map((action, index) => (
          <div key={action.label}>
            {action.separator && index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              className={cn(
                action.variant === 'destructive' && 'text-destructive'
              )}
              onClick={(e) => {
                e.stopPropagation();
                // action.onClick(row);
              }}
            >
              {action.icon && <action.icon className="mr-2 size-4" />}
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DataTableRowActions };
export type { DataTableRowActionsProps };
