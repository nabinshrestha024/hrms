import { HRCard, ListPage } from '@erp/ui';
import { salaryStructureData } from '../schema/SalaryStructureData';
import { SalaryStructureTable } from './table/salary-structure-table';

export const SalaryStructure = () => {
  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="p-6 bg-white rounded-xl shadow-none border-none"
        cardContentClassName="p-0"
      >
        <HRCard
          cardClassName="p-6 border border-border rounded-xl shadow-none"
          cardContentClassName="p-0"
        >
          <ListPage
            data={salaryStructureData}
            flat
            titleClassName="text-[18px] font-medium"
            title="Employee Salary Structure"
            search
            renderTable={(filtered) => <SalaryStructureTable data={filtered} />}
            dropdowns={[{ key: 'branch', label: 'Branch' }]}
            filterFn={(data, { search, dropdowns }) => {
              const dropdown = dropdowns.branch;
              return data.filter((item) => {
                const matchesSearch = item.employeeName
                  ?.toLowerCase()
                  .includes(search.toLowerCase());
                const matchesDropdown = dropdown
                  ? item.branch === dropdown
                  : true;
                return matchesSearch && matchesDropdown;
              });
            }}
          />
        </HRCard>
      </HRCard>
    </div>
  );
};
