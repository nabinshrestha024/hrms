import { HRCard } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
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
          <DocumentHeader
            data={salaryStructureData}
            className="px-0 py-0 mb-6"
            titleClassName="text-[18px] font-medium leading-7"
            title="Employee Salary Structure"
            isSearch={true}
            renderTable={(filtered) => <SalaryStructureTable data={filtered} />}
            dropdowns={[{ key: 'branch', label: 'Branch' }]}
            filterFn={(data, search, dropdowns) => {
              return data.filter((item) => {
                const matchesSearch = item.branch
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
        </HRCard>
      </HRCard>
    </div>
  );
};
