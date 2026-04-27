import { ListPage } from '@erp/ui';
import { attendanceListData } from '../schema/AttendanceListData';
import { AttendanceValidateTable } from './attendance-validate/attendance-validate-table';

export const AttendanceValidate = () => {
  return (
    <ListPage
      search
      dateRange
      data={attendanceListData}
      renderTable={(filtered) => <AttendanceValidateTable data={filtered} />}
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
