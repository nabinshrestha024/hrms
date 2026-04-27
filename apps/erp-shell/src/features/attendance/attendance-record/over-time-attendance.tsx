import { ListPage } from '@erp/ui';
import { attendanceListData } from '../schema/AttendanceListData';
import { OverTimeAttendanceTable } from './over-time-attendance/over-time-attendance-table';

export const OverTimeAttendance = () => {
  return (
    <ListPage
      search
      dateRange
      data={attendanceListData}
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
