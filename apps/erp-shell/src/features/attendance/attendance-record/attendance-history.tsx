import { ListPage } from '@erp/ui';
import { attendanceListData } from '../schema/AttendanceListData';
import { AttendanceHistoryTable } from './attendance-history/attendance-history-table';

export const AttendanceHistory = () => {
  return (
    <ListPage
      search
      dateRange
      data={attendanceListData}
      renderTable={(filtered) => <AttendanceHistoryTable data={filtered} />}
      dropdowns={[
        { key: 'branch', label: 'Branch' },
        { key: 'shift', label: 'Shift' },
        { key: 'employeeType', label: 'EmployeeType' },
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
