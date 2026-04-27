import { type LeaveType } from '@erp/data-access';
import { DataTable, HRCard } from '@erp/ui';
import { useConfigurationLeaveTypeTable } from './use-leave-type-table';

interface LeaveTypeTableProps {
  data: LeaveType[];
}

export const ConfigurationLeaveTypeTable = ({ data }: LeaveTypeTableProps) => {
  const { columns, table } = useConfigurationLeaveTypeTable({ data });

  return (
    <div className="px-6 pt-0 pb-32.5">
      <HRCard
        cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
        cardContentClassName="p-0 flex flex-col gap-8"
      >
        <DataTable
          table={table.table}
          columns={columns}
          className="p-0 rounded-none"
        />
      </HRCard>
    </div>
  );
};
