import { Button, FormDialog } from '@erp/ui';
import { TableHeader } from '../../../components/table-header';
import { leaveRequestData } from '../schema/LeaveRequestData';
import { LeaveRequestTable } from './table/leave-request-table';
import { Plus } from 'lucide-react';

export const LeaveRequest = () => {
  return (
    <>
      <TableHeader
        isSearch={true}
        data={leaveRequestData}
        renderTable={(filtered) => <LeaveRequestTable data={filtered} />}
        sortByDate={true}
        dropdowns={[
          { key: 'branch', label: 'Branch' },
          { key: 'status', label: 'Status' },
        ]}
        filterFn={(data, search, dropdowns) => {
          return data.filter((item) => {
            const matchesSearch = item.employeeName
              .toLowerCase()
              .includes(search.toLowerCase());

            const matchesDropdowns = Object.entries(dropdowns || {}).every(
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
              //   <AddLeaveRequestFormByAdmin onSuccess={close} />
              <></>
            )}
          </FormDialog>
        }
      />
    </>
  );
};
