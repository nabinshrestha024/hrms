import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { MasterSetupBody } from '../body';
import { leaveTypeData } from '../schema/LeaveTypeData';
import { LeaveTypeTable } from './table/leave-type-table';
import { AddLeaveTypeForm } from './add-leave-type-form';

export const LeaveType = () => {
  return (
    <DocumentHeader
      title="Currencies"
      isSearch={true}
      data={leaveTypeData}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Add LeaveType Type
            </Button>
          }
          title="Add New Leave"
          size="lg"
          formId="Leave-type-form"
          okText="Add"
          cancelText="Cancel"
        >
          {({ close }: { close: () => void }) => (
            <AddLeaveTypeForm onSuccess={close} />
          )}
        </FormDialog>
      }
      renderTable={(filteredData) => (
        <MasterSetupBody component={<LeaveTypeTable data={filteredData} />} />
      )}
    />
  );
};
