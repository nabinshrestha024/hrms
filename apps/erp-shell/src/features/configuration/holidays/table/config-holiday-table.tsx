import { DataTable } from '@erp/ui';
import { HolidayTableType } from '../../schema/HolidayData';
import { useConfigurationHolidayTable } from './use-config-holiday-table';

interface HolidayTableProps {
  data: HolidayTableType[];
}

export const ConfigurationHolidayTable = ({ data }: HolidayTableProps) => {
  const { columns, table } = useConfigurationHolidayTable({
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
