import {
  ActionDropdown,
  Button,
  SearchBar,
  Tabs,
  TabsContent,
  TabsFlex,
} from '@erp/ui';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type ViewType = 'card' | 'table';

interface PageHeaderProps<T> {
  title: string;
  buttonName?: string;
  isTabs: boolean;
  data: T[];
  onAdd?: () => void;
  renderCard: (data: T[]) => React.ReactNode;
  renderTable: (data: T[]) => React.ReactNode;
  filterFn?: (data: T[], search: string, dropdown?: string) => T[];
  dropdownKey?: keyof T;
  dropdownLabel?: string;
  actionComponent?: React.ReactNode;
}

export function PageHeader<T>({
  title,
  data,
  isTabs,
  buttonName,
  actionComponent,
  onAdd,
  renderCard,
  renderTable,
  filterFn,
  dropdownKey,
  dropdownLabel,
}: PageHeaderProps<T>) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewType>('card');
  const [dropdown, setDropdown] = useState('');

  const filteredData = filterFn ? filterFn(data, search, dropdown) : data;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownActions = [
    {
      label: 'All',
      onClick: () => setDropdown(''),
    },
    ...Array.from(
      new Set(
        data
          .map((item) => (dropdownKey ? String(item[dropdownKey]) : ''))
          .filter(Boolean)
      )
    )
      .sort()
      .map((value) => ({
        label: value,
        onClick: () => setDropdown(value),
      })),
  ];

  return (
    <Tabs value={view} onValueChange={(v) => setView(v as ViewType)}>
      <div className="flex justify-between items-center px-12 py-6">
        <div className="text-[20px] font-semibold">{title}</div>

        <div className="flex gap-4 items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-58 h-10"
          />

          {view === 'table' && dropdownKey && (
            <ActionDropdown
              open={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
              trigger={
                <div className="flex gap-2 items-center border rounded-[6px] px-4 py-2 border-border bg-white text-[14px] font-normal">
                  <span className="text-foreground text-[14px] font-normal leading-5">
                    {dropdownLabel ?? 'Filter'}
                  </span>
                  <ChevronDown className="text-[20px]" />
                </div>
              }
              actions={dropdownActions}
            />
          )}

          {isTabs && <TabsFlex />}
          {actionComponent ? (
            actionComponent
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="h-10 cursor-pointer text-[14px] font-medium leading-5 text-white"
              onClick={onAdd}
            >
              {buttonName}
            </Button>
          )}
        </div>
      </div>

      <TabsContent value="card">{renderCard(filteredData)}</TabsContent>

      <TabsContent value="table">{renderTable(filteredData)}</TabsContent>
    </Tabs>
  );
}
