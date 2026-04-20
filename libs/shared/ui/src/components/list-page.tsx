import { useMemo, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { ActionDropdown } from './dropdown/action-drop-down';
import { SearchBar } from './search/search';
import { Tabs, TabsContent } from '../primitives/tabs';
import { TabsFlex } from './tabs/tabs-flex';

type ViewType = 'card' | 'table';

export interface ListPageProps<T> {
  /** Page title shown in the header. */
  title: string;
  /**
   * Show the card/table view toggle. When `false`, only `renderCard` is
   * rendered (no toggle, no table view).
   */
  isSearch?: boolean;
  isTabs?: boolean;
  /** The full dataset. Filtering happens client-side via `filterFn`. */
  data: T[];
  /**
   * Optional client-side filter. Receives the data, current search query,
   * and current dropdown filter value. Returns the filtered subset.
   * Omit for no filtering.
   */
  filterFn?: (data: T[], search: string, dropdown?: string) => T[];
  /** Render the card view. */
  renderCard: (data: T[]) => ReactNode;
  /** Render the table view. Required when `isTabs={true}`. */
  renderTable?: (data: T[]) => ReactNode;
  /**
   * The "Add X" button label. Used only when `actionComponent` is omitted —
   * a default secondary button is rendered with this label and `onAdd`.
   */
  buttonName?: string;
  /** Click handler for the default Add button. */
  onAdd?: () => void;
  /**
   * Custom action component shown in the header (replaces the default Add
   * button). Use this when you need a `<FormDialog trigger>` or anything
   * other than a plain button.
   */
  actionComponent?: ReactNode;
  /**
   * If set, a filter dropdown appears in the header (table view only) with
   * unique values pulled from `data[*][dropdownKey]`. Selecting a value is
   * passed to `filterFn` as the third argument.
   */
  dropdownKey?: keyof T;
  /** Label for the filter dropdown trigger. Defaults to "Filter". */
  dropdownLabel?: string;
  /** Initial view mode. Defaults to "card". */
  defaultView?: ViewType;
}

/**
 * Standard list page shell. Provides:
 * - Title bar with search, optional filter dropdown, and action slot
 * - Optional card/table view toggle
 * - Client-side filtering via `filterFn`
 *
 * For pure server-driven tables (single view, no card mode), use the
 * `useServerTableState` hook directly with `<DataTable>`.
 *
 * Usage:
 * ```tsx
 * <ListPage
 *   title="Branch Management"
 *   isTabs
 *   data={branches}
 *   dropdownKey="branch"
 *   dropdownLabel="Branch"
 *   actionComponent={
 *     <FormDialog trigger={<Button>Add Branch</Button>} title="Add Branch">
 *       <BranchForm />
 *     </FormDialog>
 *   }
 *   renderCard={(filtered) => <BranchCard data={filtered} />}
 *   renderTable={(filtered) => <BranchTable data={filtered} />}
 *   filterFn={(data, search, dropdown) =>
 *     data.filter((b) => {
 *       const matchesSearch = b.branch.toLowerCase().includes(search.toLowerCase());
 *       const matchesDropdown = dropdown ? b.branch === dropdown : true;
 *       return matchesSearch && matchesDropdown;
 *     })
 *   }
 * />
 * ```
 */
export function ListPage<T>({
  title,
  data,
  isTabs = false,
  buttonName,
  isSearch,
  actionComponent,
  onAdd,
  renderCard,
  renderTable,
  filterFn,
  dropdownKey,
  dropdownLabel,
  defaultView = 'card',
}: ListPageProps<T>) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewType>(defaultView);
  const [dropdown, setDropdown] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredData = filterFn ? filterFn(data, search, dropdown) : data;

  const dropdownActions = useMemo(() => {
    if (!dropdownKey) return [];
    const uniqueValues = Array.from(
      new Set(
        data
          .map((item) => String(item[dropdownKey] ?? ''))
          .filter((value) => value.length > 0)
      )
    ).sort();

    return [
      { label: 'All', onClick: () => setDropdown('') },
      ...uniqueValues.map((value) => ({
        label: value,
        onClick: () => setDropdown(value),
      })),
    ];
  }, [data, dropdownKey]);

  return (
    <Tabs value={view} onValueChange={(v: string) => setView(v as ViewType)}>
      <div className="flex justify-between items-center px-12 py-6">
        <div className="text-[20px] font-semibold">{title}</div>

        <div className="flex gap-4 items-center">
          {isSearch && (
            <SearchBar
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="w-58 h-10"
            />
          )}

          {view === 'table' && dropdownKey && (
            <ActionDropdown
              open={isDropdownOpen}
              onOpenChange={(open: boolean) => setIsDropdownOpen(open)}
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

          {actionComponent ?? actionComponent}
        </div>
      </div>

      <TabsContent value="card">{renderCard(filteredData)}</TabsContent>

      {isTabs && renderTable && (
        <TabsContent value="table">{renderTable(filteredData)}</TabsContent>
      )}
    </Tabs>
  );
}
