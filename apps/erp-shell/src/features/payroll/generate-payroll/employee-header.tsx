import { Button } from '@erp/ui';
import { TableHeader } from '../../../components/table-header';
import { employeesDetailData } from '../schema/TableData';
import { EmployeeDetailTable } from './table/employee-detail-table';

export const EmployeeDetailHeader = () => {
  return (
    <>
      <TableHeader
        data={employeesDetailData}
        className="gap-0 justify-between items-center"
        searchClassName="w-[260px]"
        isSearch={true}
        renderTable={(filtered) => <EmployeeDetailTable data={filtered} />}
        actionComponent={
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="text-[14px] font-medium leading-5 text-primary border border-primary"
            >
              Generate All
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white flex items-center gap-1"
            >
              Generate Selected
              <span>(0)</span>
            </Button>
          </div>
        }
        dropdowns={[{ key: 'department', label: 'Department' }]}
        filterFn={(data, search, dropdowns) => {
          return data.filter((item) => {
            const matchesSearch = item.department
              ?.toLowerCase()
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
