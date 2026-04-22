import { Button, FormDialog } from '@erp/ui';
import { DocumentHeader } from '../../../components/document-management-header';
import { configurationleaveTypeData } from '../schema/LeaveTypeData';
import { ConfigurationLeaveTypeTable } from './table/leave-types-table';
import { ConfigurationLeaveTypeTabs } from './leave-type-form-tabs';

export const ConfigurationLeaveTypes = () => {
  return (
    <DocumentHeader
      title="Leave Type"
      isSearch={false}
      data={configurationleaveTypeData}
      actionComponent={
        <FormDialog
          trigger={
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="text-[14px] font-medium leading-5 text-white"
            >
              Add Leave Type
            </Button>
          }
          title="Add Leave Type"
          size="lg"
          componentClassName="border-none rounded-none shadow-none p-0"
          dialogClassName="sm:max-w-[717px]"
        >
          <ConfigurationLeaveTypeTabs />
        </FormDialog>
      }
      renderTable={(filteredData) => (
        <ConfigurationLeaveTypeTable data={filteredData} />
      )}
    />
  );
};
