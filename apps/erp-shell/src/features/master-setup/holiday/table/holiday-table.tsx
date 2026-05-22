import { type HolidayType } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useHolidayTable } from './use-holiday-table';

interface HolidayTableProps {
  data: HolidayType[];
  onEdit?: (holiday: HolidayType) => void;
  onDelete?: (id: string) => void;
}

export const HolidayTable = ({ data, onEdit, onDelete }: HolidayTableProps) => {
  const { columns, table } = useHolidayTable({ data, onEdit, onDelete });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="p-0 rounded-none"
    />
  );
};
