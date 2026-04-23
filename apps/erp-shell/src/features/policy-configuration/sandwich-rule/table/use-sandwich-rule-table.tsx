import { useServerTableState } from '@erp/ui';
import { SandwichRuleTableType } from '../../schema/SandwichRuleData';
import { getSandwichRuleColumn } from './get-sandwich-rule-column';

interface SandwichRuleTableProps {
  data: SandwichRuleTableType[];
}

export function useSandwichRuleTable({ data }: SandwichRuleTableProps) {
  const columns = getSandwichRuleColumn();

  const table = useServerTableState<SandwichRuleTableType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.name,
  });

  return {
    table,
    columns,
  };
}
