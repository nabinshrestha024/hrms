import { TableHeader } from '../../../components/table-header';
import { attendanceListData } from '../schema/AttendanceListData';
import { AttendanceHistoryTable } from './attendance-history/attendance-history-table';

export const AttendanceHistory = () => {
  return (
    <>
      <TableHeader
        isSearch={true}
        data={attendanceListData}
        renderTable={(filtered) => <AttendanceHistoryTable data={filtered} />}
        sortByDate={true}
        dropdowns={[
          { key: 'branch', label: 'Branch' },
          { key: 'shift', label: 'Shift' },
          { key: 'employeeType', label: 'EmployeeType' },
        ]}
        filterFn={(data, search, dropdowns) => {
          return data.filter((item) => {
            const matchesSearch = item.employeeName
              .toLowerCase()
              .includes(search.toLowerCase());

            const matchesDropdowns = Object.entries(dropdowns || {}).every(
              ([key, value]) =>
                !value || String(item[key as keyof typeof item]) === value
            );

            return matchesSearch && matchesDropdowns;
          });
        }}
      />
    </>
  );
};
