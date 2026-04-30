import { Button, ListPage } from '@erp/ui';
import { EmployeeDetailTable } from './table/employee-detail-table';
import { GeneratePayroll, useGeneratePayroll } from '@erp/data-access';
import { generatePayrollSeed } from '../../../mocks/modules/generate-payroll/seed';

export const EmployeeDetailHeader = () => {
  const { data: response } = useGeneratePayroll({ pageSize: 100 });
  const data: GeneratePayroll[] = response?.data ?? generatePayrollSeed;
  console.warn(data, 'Generate Payroll');

  return (
    <>
      <ListPage
        data={data}
        search
        controlClassName="mb-0"
        renderTable={(rows) => <EmployeeDetailTable data={rows} />}
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
        filterFn={(data, { search, dropdowns }) => {
          return data.filter((item) => {
            const matchesSearch = item.name
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
