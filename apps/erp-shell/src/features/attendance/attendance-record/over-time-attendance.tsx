import { useAttendanceRecords } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import {
  toAttendanceListRecord,
  type AttendanceListRecord,
} from '../schema/AttendanceListData';
import { OverTimeAttendanceTable } from './over-time-attendance/over-time-attendance-table';

export const OverTimeAttendance = () => {
  const { data: response } = useAttendanceRecords({ pageSize: 100 });
  const data = (response?.data ?? []).map(toAttendanceListRecord);

  return (
    <ListPage<AttendanceListRecord>
      search
      dateRange
      data={data}
      renderTable={(filtered) => <OverTimeAttendanceTable data={filtered} />}
      dropdowns={[
        { key: 'branch', label: 'Branch' },
        { key: 'shift', label: 'Shift' },
      ]}
      filterFn={(data, { search, dropdowns }) => {
        return data.filter((item) => {
          const matchesSearch = item.employeeName
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesDropdowns = Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(item[key as keyof typeof item]) === value
          );

          return matchesSearch && matchesDropdowns;
        });
      }}
    />
  );
};
