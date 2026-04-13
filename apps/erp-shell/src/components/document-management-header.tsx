import { ActionDropdown, SearchBar } from '@erp/ui';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DropdownConfig<T> {
  key: keyof T;
  label: string;
}

interface DocumentHeaderProps<T> {
  title: string;
  data: T[];
  dropdowns?: DropdownConfig<T>[];
  onAdd?: () => void;
  renderTable: (data: T[]) => React.ReactNode;
  filterFn?: (
    data: T[],
    search: string,
    dropdowns?: Record<string, string>
  ) => T[];
}

export function DocumentHeader<T>({
  title,
  data,
  onAdd,
  renderTable,
  filterFn,
  dropdowns,
}: DocumentHeaderProps<T>) {
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
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-12 py-6">
        <div className="text-[20px] font-semibold">{title}</div>

        <div className="flex gap-4 items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-58 h-10"
          />

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
        </div>
      </div>
      {renderTable(filteredData)}
    </div>
  );
}
