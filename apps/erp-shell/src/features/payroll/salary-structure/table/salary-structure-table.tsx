import { DataTable } from '@erp/ui';
import { SalaryStructureType } from '../../schema/SalaryStructureData';
import { useSalaryStructureTable } from './use-salary-structure-table';

interface SalaryStructureTableProps {
  data: SalaryStructureType[];
}

export const SalaryStructureTable = ({ data }: SalaryStructureTableProps) => {
  const { columns, table } = useSalaryStructureTable({ data });

  return (
    <>
      <DataTable
        table={table}
        columns={columns}
        className="xl:p-0 p-0 rounded-none"
      />
    </>
  );
};
