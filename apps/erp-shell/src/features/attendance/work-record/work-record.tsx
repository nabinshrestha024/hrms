import { TableHeader } from '../../../components/table-header';
import { workRecordData } from '../schema/WorkRecordData';
import { WorkRecordTable } from './work-record-table';

export const WorkRecord = () => {
  return (
    <>
      <TableHeader
        isSearch={true}
        data={workRecordData}
        renderTable={(filtered) => <WorkRecordTable data={filtered} />}
        sortByDate={true}
        dropdowns={[{ key: 'branch', label: 'Branch' }]}
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
