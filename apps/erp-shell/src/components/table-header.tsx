import { ActionDropdown, DatePicker, SearchBar } from '@erp/ui';
import { cn } from '@erp/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropdownConfig<T> {
  key: keyof T;
  label: string;
}

interface TableHeaderProps<T> {
  isSearch?: boolean;
  sortByDate?: boolean;
  data: T[];
  dropdowns?: DropdownConfig<T>[];
  actionComponent?: React.ReactNode;
  buttonName?: string;
  headerClassName?: string;
  className?: string;
  searchClassName?: string;
  renderTable: (data: T[]) => React.ReactNode;
  filterFn?: (
    data: T[],
    search: string,
    dropdowns?: Record<string, string>
  ) => T[];
}

export function TableHeader<T>({
  data,
  renderTable,
  filterFn,
  isSearch,
  sortByDate,
  dropdowns,
  actionComponent,
  className,
  headerClassName,
  searchClassName,
}: TableHeaderProps<T>) {
  const [search, setSearch] = useState('');

  const [dropdownValues, setDropdownValues] = useState<Record<string, string>>(
    {}
  );

  const handleDropdownChange = (key: string, value: string) => {
    setDropdownValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const filteredData = filterFn ? filterFn(data, search, dropdownValues) : data;

  const getDropdownActions = (key: keyof T) => {
    return [
      {
        label: 'All',
        onClick: () => handleDropdownChange(String(key), ''),
      },
      ...Array.from(
        new Set(data.map((item) => String(item[key])).filter(Boolean))
      )
        .sort()
        .map((value) => ({
          label: value,
          onClick: () => handleDropdownChange(String(key), value),
        })),
    ];
  };

  return (
    <div className={cn(`flex flex-col gap-8 ${headerClassName}`)}>
      <div className={cn(`flex gap-6 items-center ${className}`)}>
        {isSearch && (
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className={cn(`h-10 ${searchClassName}`)}
          />
        )}
        <div className="flex gap-4 items-center">
          {dropdowns?.map((dropdownItem) => {
            const key = String(dropdownItem.key);

            return (
              <ActionDropdown
                key={key}
                open={isOpen === key}
                onOpenChange={(open) => setIsOpen(open ? key : null)}
                trigger={
                  <div className="flex gap-2 items-center border rounded-[6px] px-4 py-2 border-border bg-white text-[14px] font-normal cursor-pointer">
                    <span className="text-foreground text-[14px] font-normal leading-5">
                      {dropdownValues[key] || dropdownItem.label}
                    </span>
                    <ChevronDown className="w-5 h-5 text-secondary-foreground" />
                  </div>
                }
                actions={getDropdownActions(dropdownItem.key)}
              />
            );
          })}
          {sortByDate && (
            <DatePicker
              placeholder="Jan 20, 2023 - Feb 09, 2023"
              className="px-4 py-2.5 border-[#E4E4E7]"
            />
          )}
          {actionComponent && actionComponent}
        </div>
      </div>
      {renderTable(filteredData)}
    </div>
  );
}
