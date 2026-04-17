import { DataTable } from '@erp/ui';
import { VisibilityType } from '../../schema/VisibilityData';
import { useVisibilityTable } from './use-visibility-table';

interface VisbilityTableProps {
  data: VisibilityType[];
}

export const VisbilityTable = ({ data }: VisbilityTableProps) => {
  const { columns, table } = useVisibilityTable({
    data,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <DataTable table={table} columns={columns} />
      </div>
    </>
  );
};
