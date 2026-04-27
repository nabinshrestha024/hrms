import { ListPage } from '@erp/ui';
import { workRecordData } from '../schema/WorkRecordData';
import { WorkRecordTable } from './work-record-table';

export const WorkRecord = () => {
  return (
    <ListPage
      search
      dateRange
      data={workRecordData}
      renderTable={(filtered) => <WorkRecordTable data={filtered} />}
      dropdowns={[{ key: 'branch', label: 'Branch' }]}
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
