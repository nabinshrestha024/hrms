import { type Holiday } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useConfigurationHolidayTable } from './use-config-holiday-table';

interface HolidayTableProps {
  data: Holiday[];
}

export const ConfigurationHolidayTable = ({ data }: HolidayTableProps) => {
  const { columns, table } = useConfigurationHolidayTable({ data });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
