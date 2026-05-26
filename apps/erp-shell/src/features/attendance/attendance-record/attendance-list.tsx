import { useAttendanceRecords } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import {
  toAttendanceListRecord,
  type AttendanceListRecord,
} from '../schema/AttendanceListData';
import { AttendanceListTable } from './attendance-list/attendance-list-table';
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns';

export const AttendanceList = () => {
  const { data: response } = useAttendanceRecords({ pageSize: 100 });
  const data = (response?.data ?? []).map(toAttendanceListRecord);

  return (
    <ListPage<AttendanceListRecord>
      search
      dateRange
      data={data}
      renderTable={(filtered) => <AttendanceListTable data={filtered} />}
      dropdowns={[
        { key: 'branch', label: 'Branch' },
        { key: 'shift', label: 'Shift' },
        { key: 'status', label: 'Status' },
      ]}
      filterFn={(data, { search, dateRange, dropdowns }) => {
        return data.filter((item) => {
          const matchesSearch = item.employeeName
            .toLowerCase()
            .includes(search.toLowerCase());

          let matchesDate = true;

          if (dateRange?.from && dateRange?.to) {
            const itemDate =
              (item.date as any) instanceof Date
                ? item.date
                : new Date(item.date as any);

            matchesDate = isWithinInterval(itemDate, {
              start: startOfDay(dateRange.from),
              end: endOfDay(dateRange.to),
            });
          }

          const matchesDropdowns = Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(item[key as keyof typeof item]) === value
          );

          return matchesSearch && matchesDropdowns && matchesDate;
        });
      }}
    />
  );
};
