import { type HolidayType } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useHolidayTable } from './use-holiday-table';

interface HolidayTableProps {
  data: HolidayType[];
}

export const HolidayTable = ({ data }: HolidayTableProps) => {
  const { columns, table } = useHolidayTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
