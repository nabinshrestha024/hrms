import { DataTable } from '@erp/ui';
import { WorkTypeDataType } from '../../schema/WorkTypeData';
import { useWorkTable } from './use-work-type-table';

interface WorkTableProps {
  data: WorkTypeDataType[];
}

export const WorkTable = ({ data }: WorkTableProps) => {
  const { columns, table } = useWorkTable({
    data,
  });

  return (
    <>
      <DataTable
        table={table.table}
        columns={columns}
        className="p-0 rounded-none"
      />
    </>
  );
};
