import { TableHeader } from '../../../components/table-header';
import { attendanceListData } from '../schema/AttendanceListData';
import { AttendanceListTable } from './attendance-list/attendance-list-table';

export const AttendanceList = () => {
  return (
    <>
      <TableHeader
        isSearch={true}
        data={attendanceListData}
        renderTable={(filtered) => <AttendanceListTable data={filtered} />}
        sortByDate={true}
        dropdowns={[
          { key: 'branch', label: 'Branch' },
          { key: 'shift', label: 'Shift' },
          { key: 'status', label: 'Status' },
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
