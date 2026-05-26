import { type Holiday } from '@erp/data-access';
import { DataTable } from '@erp/ui';
import { useConfigurationHolidayTable } from './use-config-holiday-table';

interface HolidayTableProps {
  data: Holiday[];
  onEdit?: (holiday: Holiday) => void;
  onDelete?: (id: string) => void;
}

export const ConfigurationHolidayTable = ({
  data,
  onDelete,
  onEdit,
}: HolidayTableProps) => {
  const { columns, table } = useConfigurationHolidayTable({
    data,
    onDelete,
    onEdit,
  });

  return (
    <DataTable
      table={table.table}
      columns={columns}
      className="xl:p-0 p-0 rounded-none"
    />
  );
};
