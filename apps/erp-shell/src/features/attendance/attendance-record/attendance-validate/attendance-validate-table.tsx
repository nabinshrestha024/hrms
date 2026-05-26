import { DataTable } from '@erp/ui';
import { AttendanceListRecord } from '../../schema/AttendanceListData';
import { useAttendanceValidateTable } from './use-attendance-validate-table';

interface AttendanceValidateTableProps {
  data: AttendanceListRecord[];
}

export const AttendanceValidateTable = ({
  data,
}: AttendanceValidateTableProps) => {
  const { columns, table } = useAttendanceValidateTable({
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
