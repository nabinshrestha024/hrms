import { useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { ActionDropdown } from './dropdown/action-drop-down';
import { SearchBar } from './search/search';
import { Tabs, TabsContent } from '../primitives/tabs';
import { TabsFlex } from './tabs/tabs-flex';
import { DatePicker } from './form/date-picker';
import { Button } from '../primitives/button';
import { cn } from '@erp/utils';
import { getDateRangeData } from '../lib/get-date-range-data';

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
   * Page title shown at the left of the header.
   */
  title?: string;

  /** The full dataset. */
  data: T[];

  // ── Capabilities ──────────────────────────────────────────────────
  /** Show the search input. */
  search?: boolean;

  /** Show a date-range picker. */
  dateRange?: boolean;

  /**
   * Show one or more dropdown filters.
   */
  dropdowns?: ListPageDropdown<T>[];

  /**
   * Which views to expose.
   */
  views?: ListPageView[];

  /** Initial view when both views are available. */
  defaultView?: ListPageView;

  // ── Slots ─────────────────────────────────────────────────────────
  /**
   * Header action component.
   */
  actionComponent?: ReactNode;

  /** Default Add-button label. */
  buttonName?: string;

  /** Click handler for the default Add button. */
  onAdd?: () => void;

  /** Card view renderer. */
  renderCard?: (data: T[]) => ReactNode;

  /** Table view renderer. */
  renderTable?: (data: T[]) => ReactNode;

  /**
   * Client-side filter function.
   */
  filterFn?: (data: T[], query: ListPageQuery) => T[];

  /**
   * Remove default padding.
   */
  flat?: boolean;

  titleClassName?: string;

  controlClassName?: string;
}

function inferViews<T>(props: ListPageProps<T>): ListPageView[] {
  if (props.views && props.views.length > 0) {
    return props.views;
  }

  const hasCard = !!props.renderCard;
  const hasTable = !!props.renderTable;

  if (hasCard && hasTable) return ['card', 'table'];
  if (hasCard) return ['card'];
  if (hasTable) return ['table'];

  return ['card'];
}

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
  const [selectedOption, setSelectedOption] = useState<{
    key: string;
    value: string;
  } | null>(null);

  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('');

  const setDropdown = (key: string, value: string) => {
    setDropdownValues((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      {
        label: 'All',

        onClick: () => {
          setDropdown(stringKey, '');

          setSelectedOption({
            key: stringKey,
            value: '',
          });
        },

        isActive:
          selectedOption?.key === stringKey && selectedOption?.value === '',
      },

      ...uniqueValues.map((value) => ({
        label: value,

        onClick: () => {
          setDropdown(stringKey, value);

          setSelectedOption({
            key: stringKey,
            value,
          });
        },

        isActive:
          selectedOption?.key === stringKey && selectedOption?.value === value,
      })),
    ];
  };

  const dropdownCount = dropdowns?.length ?? 0;
  const onlyDateRange = dateRange && dropdownCount === 0;
  const onlyOneDropDownFilter = dropdownCount === 1 && !dateRange;
  const multipleFilters = dropdownCount > 1 || (dropdownCount > 0 && dateRange);

  const controls = (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        {search && (
          <SearchBar
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className=" h-10"
          />
        )}

        <div className="ml-2 xl:ml-4 flex gap-2 xl:gap-4 items-center">
          <div className="hidden lg:flex lg:gap-2 lg:xl:gap-4 lg:items-center">
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
                    <div className=" flex gap-2 items-center border rounded-[6px] px-4 py-2 border-border bg-white text-[14px] font-normal cursor-pointer">
                      <span className="w-full text-foreground text-[14px] font-normal leading-5">
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
                placeholder="Jan 20, 2023 - Feb 09, 2023"
                className="px-4 py-2.5 border-border"
                presets={getDateRangeData({
                  selectedDateRange,
                  setSelectedDateRange,
                })}
              />
            )}
          </div>

          {/* View Toggle */}
          {showToggle && <TabsFlex />}

          {/* Action Button */}
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

          {/* Mobile / Tablet Filters */}
          <div className="flex lg:hidden">
            {/* Multiple filters => filter button */}
            {multipleFilters && (
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpenFilter((prev) => !prev)}
                className="h-10"
              >
                {openFilter ? (
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setOpenFilter((prev) => prev)}
                  />
                ) : (
                  <SlidersHorizontal className="w-4 h-4 cursor-pointer" />
                )}
              </Button>
            )}

            {/* Only date range */}
            {onlyDateRange && (
              <DatePicker
                value={dateRangeValue}
                onChange={setDateRangeValue}
                placeholder="Jan 20, 2023 - Feb 09, 2023"
                className="px-4 py-2.5 border-border"
                presets={getDateRangeData({
                  selectedDateRange,
                  setSelectedDateRange,
                })}
              />
            )}

            {/* Only one dropdown */}
            {onlyOneDropDownFilter &&
              dropdowns?.map((d) => {
                const stringKey = String(d.key);
                const mobileKey = `mobile-${stringKey}`;
                return (
                  <ActionDropdown
                    key={mobileKey}
                    open={openDropdownKey === mobileKey}
                    onOpenChange={(open) =>
                      setOpenDropdownKey(open ? mobileKey : null)
                    }
                    trigger={
                      <Button
                        variant="outline"
                        type="button"
                        className="h-10 flex items-center gap-2"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                      </Button>
                    }
                    actions={dropdownActionsFor(d.key)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );

  const filter = (
    <>
      {openFilter && multipleFilters && (
        <div className="lg:hidden flex flex-wrap gap-2 items-center justify-end">
          {dropdowns?.map((d) => {
            const stringKey = String(d.key);
            const selected = dropdownValues[stringKey] ?? '';
            const mobileKey = `mobile-${stringKey}`;
            return (
              <ActionDropdown
                key={mobileKey}
                open={openDropdownKey === mobileKey}
                onOpenChange={(open) =>
                  setOpenDropdownKey(open ? mobileKey : null)
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
              placeholder="Jan 20, 2023 - Feb 09, 2023"
              className="px-4 py-2.5 border-border"
              presets={getDateRangeData({
                selectedDateRange,
                setSelectedDateRange,
              })}
            />
          )}
        </div>
      )}
    </>
  );

  const header = title ? (
    <div
      className={cn(
        `flex flex-col gap-1  ${flat ? 'mb-6' : 'px-6 xl:px-12 py-6'}`
      )}
    >
      <div className={cn(`flex justify-between items-center`)}>
        <div
          className={cn(
            `text-[20px] font-semibold leading-7 text-foreground`,
            titleClassName
          )}
        >
          {title}
        </div>

        {controls}
      </div>
      {filter}
    </div>
  ) : (
    <div className={cn(`mb-6 flex flex-col gap-1 ${controlClassName}`)}>
      {controls}
      {filter}
    </div>
  );

  // Single View
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

  // Both Views
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
