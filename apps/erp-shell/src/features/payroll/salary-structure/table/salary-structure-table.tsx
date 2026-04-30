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
      <DataTable table={table} columns={columns} className="px-0 py-0" />
    </>
  );
};
