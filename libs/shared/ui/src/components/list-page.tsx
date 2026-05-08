import { useMemo, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { ActionDropdown } from './dropdown/action-drop-down';
import { SearchBar } from './search/search';
import { Tabs, TabsContent } from '../primitives/tabs';
import { TabsFlex } from './tabs/tabs-flex';
import { DatePicker } from './form/date-picker';
import { Button } from '../primitives/button';
import { cn } from '@erp/utils';

export type ListPageView = 'card' | 'table';

export interface ListPageDropdown<T> {
  /** The data property to filter by. */
  key: keyof T;
  /** Trigger label shown when no value is selected. */
  label: string;
}

export interface ListPageQuery {
  /** Current search input. Empty string when not in use. */
  search: string;
  /** Selected date range, or `undefined` when not set. */
  dateRange?: DateRange;
  /**
   * Selected dropdown values, keyed by the dropdown's `key` cast to string.
   * `''` means "All" / no filter selected for that dropdown.
   */
  dropdowns: Record<string, string>;
}

export interface ListPageProps<T> {
  /**
   * Page title shown at the left of the header. Omit when this list is
   * embedded inside a parent that already supplies its own title — the
   * header will render only the right-side controls (search, dropdowns,
   * date range, view toggle, action) without the surrounding `px-12`
   * padding so the parent's padding governs. Spacing between the header
   * row and the rendered content is preserved via `gap-6`.
   */
  title?: string;
  /** The full dataset. Filtering happens client-side via `filterFn`. */
  data: T[];

  // ── Capabilities (opt-in) ─────────────────────────────────────────
  /** Show the search input. Default: false. */
  search?: boolean;
  /** Show a date-range picker. Default: false. */
  dateRange?: boolean;
  /**
   * Show one or more dropdown filters. Each unique value of `data[*][key]`
   * becomes an option, plus an "All" option.
   */
  dropdowns?: ListPageDropdown<T>[];
  /**
   * Which views to expose. Omit to infer from which renderers are passed:
   *   - both `renderCard` and `renderTable` -> `['card', 'table']` with toggle
   *   - only `renderCard` -> `['card']` (no toggle)
   *   - only `renderTable` -> `['table']` (no toggle)
   */
  views?: ListPageView[];
  /** Initial view when both views are available. Default: 'card'. */
  defaultView?: ListPageView;

  // ── Slots ─────────────────────────────────────────────────────────
  /**
   * Header right-side action (e.g. `<FormDialog trigger={<Button>Add</Button>}>`).
   * If omitted and `buttonName` is set, a default secondary button is rendered.
   */
  actionComponent?: ReactNode;
  /** Default Add-button label, used only when `actionComponent` is omitted. */
  buttonName?: string;
  /** Click handler for the default Add button. */
  onAdd?: () => void;

  /** Card view renderer. */
  renderCard?: (data: T[]) => ReactNode;
  /** Table view renderer. */
  renderTable?: (data: T[]) => ReactNode;

  /**
   * Client-side filter. Receives the full dataset plus the current query
   * (search, date range, dropdown selections). Return the filtered subset.
   * Omit for no filtering.
   */
  filterFn?: (data: T[], query: ListPageQuery) => T[];

  /**
   * Drop the default `px-12 py-6` padding on the titled header. Use when
   * embedding inside a parent that already supplies its own padding (e.g.
   * a card wrapper). Has no effect when `title` is omitted, since the
   * embedded layout already runs without horizontal padding.
   */
  flat?: boolean;
  titleClassName?: string;
  controlClassName?: string;
}

function inferViews<T>(props: ListPageProps<T>): ListPageView[] {
  if (props.views && props.views.length > 0) return props.views;
  const hasCard = !!props.renderCard;
  const hasTable = !!props.renderTable;
  if (hasCard && hasTable) return ['card', 'table'];
  if (hasCard) return ['card'];
  if (hasTable) return ['table'];
  return ['card'];
}

/**
 * Standard list page shell. Provides:
 * - Title bar with optional search, date-range, multi-dropdown filters,
 *   and an action slot
 * - Card / table view toggle (when both renderers are provided)
 * - Client-side filtering via `filterFn`
 *
 * For pure server-driven tables (no card view, no client filter), use the
 * `useServerTableState` hook directly with `<DataTable>`.
 *
 * Usage:
 * ```tsx
 * <ListPage<Branch>
 *   title="Branch Management"
 *   search
 *   data={branches}
 *   dropdowns={[{ key: 'branch', label: 'Branch' }]}
 *   actionComponent={<FormDialog trigger={<Button>Add Branch</Button>} ... />}
 *   renderCard={(rows) => <BranchCard data={rows} />}
 *   renderTable={(rows) => <BranchTable data={rows} />}
 *   filterFn={(data, { search, dropdowns }) =>
 *     data.filter((b) => {
 *       const matchesSearch = b.branch
 *         .toLowerCase()
 *         .includes(search.toLowerCase());
 *       const dropdown = dropdowns.branch;
 *       const matchesDropdown = dropdown ? b.branch === dropdown : true;
 *       return matchesSearch && matchesDropdown;
 *     })
 *   }
 * />
 * ```
 */

export function ListPage<T>(props: ListPageProps<T>) {
  const {
    title,
    data,
    search = false,
    dateRange = false,
    dropdowns,
    actionComponent,
    buttonName,
    controlClassName,
    titleClassName,
    onAdd,
    renderCard,
    renderTable,
    filterFn,
    defaultView,
    flat = false,
  } = props;

  const views = useMemo(() => inferViews(props), [props]);
  const showToggle = views.includes('card') && views.includes('table');
  const initialView: ListPageView =
    defaultView && views.includes(defaultView) ? defaultView : views[0];

  const [view, setView] = useState<ListPageView>(initialView);
  const [searchValue, setSearchValue] = useState('');
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>();
  const [dropdownValues, setDropdownValues] = useState<Record<string, string>>(
    {}
  );
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const setDropdown = (key: string, value: string) => {
    setDropdownValues((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = filterFn
    ? filterFn(data, {
        search: searchValue,
        dateRange: dateRangeValue,
        dropdowns: dropdownValues,
      })
    : data;

  const dropdownActionsFor = (key: keyof T) => {
    const stringKey = String(key);
    const uniqueValues = Array.from(
      new Set(
        data
          .map((item) => String(item[key] ?? ''))
          .filter((value) => value.length > 0)
      )
    ).sort();

    return [
      { label: 'All', onClick: () => setDropdown(stringKey, '') },
      ...uniqueValues.map((value) => ({
        label: value,
        onClick: () => setDropdown(stringKey, value),
      })),
    ];
  };

  const controls = (
    <div className="hidden md:flex md:justify-between md:items-center">
      {search && (
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-50 xl:w-58 h-10"
        />
      )}
      <div className="ml-2 xl:ml-4 flex gap-2 xl:gap-4 items-center">
        {dropdowns?.map((d) => {
          const stringKey = String(d.key);
          const selected = dropdownValues[stringKey] ?? '';
          return (
            <ActionDropdown
              key={stringKey}
              open={openDropdownKey === stringKey}
              onOpenChange={(open) =>
                setOpenDropdownKey(open ? stringKey : null)
              }
              trigger={
                <div className="flex gap-2 items-center border rounded-[6px] px-4 py-2 border-border bg-white text-[14px] font-normal cursor-pointer">
                  <span className="text-foreground text-[14px] font-normal leading-5">
                    {selected || d.label}
                  </span>
                  <ChevronDown className="w-5 h-5 text-secondary-foreground" />
                </div>
              }
              actions={dropdownActionsFor(d.key)}
            />
          );
        })}

        {dateRange && (
          <DatePicker
            value={dateRangeValue}
            onChange={setDateRangeValue}
            placeholder="Pick date range"
            className="px-4 py-2.5 border-border"
          />
        )}

        {showToggle && <TabsFlex />}

        {actionComponent ??
          (buttonName ? (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
              onClick={onAdd}
            >
              {buttonName}
            </Button>
          ) : null)}
      </div>
    </div>
  );

  const header = title ? (
    // Page-level header: title left, controls right.
    // Default: standard `px-12 py-6` padding that owns the page chrome.
    // `flat` strips the padding for use inside a parent that already pads.
    <div
      className={`flex justify-between items-center
        ${flat ? 'mb-6' : 'px-6 xl:px-12 py-6'}`}
    >
      <div
        className={cn(
          `text-[20px] font-semibold leading-7 text-foreground ${titleClassName}`
        )}
      >
        {title}
      </div>
      {controls}
    </div>
  ) : (
    // Embedded header: parent supplies horizontal padding. Right-align
    // the controls and add bottom spacing so content below isn't flush.
    <div className={cn(`mb-6 ${controlClassName}`)}>{controls}</div>
  );

  // No view toggle: render the only available view directly, no Tabs wrapper.
  if (!showToggle) {
    const only = views[0];
    return (
      <>
        {header}
        {only === 'card' && renderCard?.(filteredData)}
        {only === 'table' && renderTable?.(filteredData)}
      </>
    );
  }

  return (
    <Tabs
      value={view}
      onValueChange={(v: string) => setView(v as ListPageView)}
    >
      {header}
      <TabsContent value="card">{renderCard?.(filteredData)}</TabsContent>
      <TabsContent value="table">{renderTable?.(filteredData)}</TabsContent>
    </Tabs>
  );
}
