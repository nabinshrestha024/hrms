import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@erp/ui';
import { cn } from '@erp/utils';
import { Plus, List, Grid2X2, Search } from 'lucide-react';

interface EmployeeToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  branch: string;
  onBranchChange: (value: string) => void;
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
  onAddClick: () => void;
}

const branches = ['Baneshwor', 'Naxal', 'Kalanki', 'Pulchowk', 'Lalitpur'];

export function EmployeeToolbar({
  search,
  onSearchChange,
  branch,
  onBranchChange,
  view,
  onViewChange,
  onAddClick,
}: EmployeeToolbarProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Employee Management</h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search.."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Branch filter */}
          <Select value={branch || 'all'} onValueChange={onBranchChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {branches.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="flex items-center border border-primary rounded-lg overflow-hidden">
            <button
              type="button"
              className={cn('p-2 transition-colors', view === 'list' ? 'bg-primary text-white' : 'text-primary')}
              onClick={() => onViewChange('list')}
            >
              <List className="size-4" />
            </button>
            <button
              type="button"
              className={cn('p-2 transition-colors', view === 'grid' ? 'bg-primary text-white' : 'text-primary')}
              onClick={() => onViewChange('grid')}
            >
              <Grid2X2 className="size-4" />
            </button>
          </div>

          {/* Add Employee */}
          <Button onClick={onAddClick}>
            <Plus className="mr-2 size-4" />
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  );
}
