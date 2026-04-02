import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@erp/ui';
import { cn } from '@erp/utils';
import type { Employee } from '@erp/data-access';
import { MoreVertical } from 'lucide-react';

interface EmployeeCardGridProps {
  employees: Employee[];
  onNavigate: (id: string) => void;
}

export function EmployeeCardGrid({ employees, onNavigate }: EmployeeCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="relative flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate(emp.id)}
        >
          <Avatar className="size-12 shrink-0">
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {emp.firstName[0]}{emp.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-base font-medium text-foreground">
              {emp.firstName} {emp.lastName}
            </p>
            <div className="mt-1 space-y-0.5">
              <p className="text-base font-medium text-muted-foreground truncate">{emp.email}</p>
              <p className="text-base font-medium text-muted-foreground">{emp.designation}</p>
              <div className="flex items-center gap-0.5">
                <span className={cn(
                  'inline-block size-2 rounded-full',
                  emp.status === 'active' ? 'bg-[#00A63E]' : 'bg-muted-foreground',
                )} />
                <span className={cn(
                  'text-base font-medium',
                  emp.status === 'active' ? 'text-[#00A63E]' : 'text-muted-foreground',
                )}>
                  {emp.status === 'active' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="absolute right-3 top-3 p-1 rounded-md hover:bg-accent"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px]">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); alert(`Edit: ${emp.firstName}`); }}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); alert(`Block: ${emp.firstName}`); }}>
                Block
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-[#E7000B] focus:text-[#E7000B]"
                onClick={(e) => { e.stopPropagation(); alert(`Delete: ${emp.firstName}`); }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
}
