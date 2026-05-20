import { DataTable } from '@erp/ui';
import { SandwichRuleTableType } from '../../schema/SandwichRuleData';
import { useSandwichRuleTable } from './use-sandwich-rule-table';

interface SandwichRuleTableProps {
  data: SandwichRuleTableType[];
}

export const SandwichRuleTable = ({ data }: SandwichRuleTableProps) => {
  const { columns, table } = useSandwichRuleTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="xl:p-0 p-0 rounded-none"
      />
    </>
  );
};
