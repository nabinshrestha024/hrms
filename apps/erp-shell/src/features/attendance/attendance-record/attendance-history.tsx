import { useAttendanceRecords } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import {
  toAttendanceListRecord,
  type AttendanceListRecord,
} from '../schema/AttendanceListData';
import { AttendanceHistoryTable } from './attendance-history/attendance-history-table';

export const AttendanceHistory = () => {
  const { data: response } = useAttendanceRecords({ pageSize: 100 });
  const data = (response?.data ?? []).map(toAttendanceListRecord);

  return (
    <ListPage<AttendanceListRecord>
      search
      dateRange
      data={data}
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
