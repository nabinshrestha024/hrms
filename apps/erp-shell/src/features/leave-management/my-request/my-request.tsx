import { useLeaveRequests } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import type { LeaveRequest as LeaveRequestRow } from '../schema/LeaveRequestData';
import { Plus } from 'lucide-react';
import { MyRequestTable } from './table/my-request-table';
import { AddLeaveRequestForm } from '../../attendance/my-attendance/add-leave-request-form';

export const MyRequestDetails = () => {
  const { data: response } = useLeaveRequests({ pageSize: 100 });
  // Inner table types against legacy shape (`duration` + capitalized status);
  // bridge the canonical fields here until Phase 3.2 reconciles them.
  const data = (response?.data ?? []).map((r) => ({
    ...r,
    duration: `${r.fromDate}-${r.toDate}`,
    status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
  })) as unknown as LeaveRequestRow[];

  return (
    <ListPage<LeaveRequestRow>
      search
      dateRange
      data={data}
      renderTable={(filtered) => <MyRequestTable data={filtered} />}
      dropdowns={[
        { key: 'branch', label: 'Branch' },
        { key: 'status', label: 'Status' },
      ]}
      filterFn={(data, { search, dropdowns }) => {
        return data.filter((item) => {
          const matchesSearch = item.employeeName
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesDropdowns = Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(item[key as keyof typeof item]) === value
          );

          return matchesSearch && matchesDropdowns;
        });
      }}
      actionComponent={
        <FormDialog
          trigger={
            <Button variant="secondary" className="flex gap-1">
              <Plus className="w-4 h-4 text-white" />
              <span>Leave Request</span>
            </Button>
          }
          title="Add Leave Request"
          okText="Add"
          size="lg"
          cancelText="Cancel"
          formId="add-leave-request-form"
          componentClassName="py-4 pl-4 pr-2"
        >
          {({ close }: { close: () => void }) => (
            <AddLeaveRequestForm onSuccess={close} />
          )}
        </FormDialog>
      }
    />
  );
};
