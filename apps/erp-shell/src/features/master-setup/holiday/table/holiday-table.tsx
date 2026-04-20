import { DataTable } from '@erp/ui';
import { HolidayDataType } from '../../schema/HolidayData';
import { useHolidayTable } from './use-holiday-table';

interface HolidayTableProps {
  data: HolidayDataType[];
}

export const HolidayTable = ({ data }: HolidayTableProps) => {
  const { columns, table } = useHolidayTable({
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
