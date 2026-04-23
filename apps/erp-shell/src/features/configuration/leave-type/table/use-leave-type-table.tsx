import { useServerTableState } from '@erp/ui';
import { ConfigurationLeaveType } from '../../schema/LeaveTypeData';
import { getConfigurationLeaveTypeColumn } from './get-leave-type-column';

interface LeaveTypeTableProps {
  data: ConfigurationLeaveType[];
}

export function useConfigurationLeaveTypeTable({ data }: LeaveTypeTableProps) {
  const columns = getConfigurationLeaveTypeColumn();

  const table = useServerTableState<ConfigurationLeaveType>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row) => row.leaveType,
  });

  return {
    table,
    columns,
  };
}
