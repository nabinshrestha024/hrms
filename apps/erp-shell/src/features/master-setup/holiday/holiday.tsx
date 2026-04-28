import { Can, PERM_SUBJECTS } from '@erp/auth';
import { useHolidayTypes, type HolidayType } from '@erp/data-access';
import { Button, FormDialog, ListPage } from '@erp/ui';
import { MasterSetupBody } from '../body';
import { AddHolidayForm } from './add-holiday-form';
import { HolidayTable } from './table/holiday-table';

export const Holiday = () => {
  const { data: response } = useHolidayTypes({ pageSize: 100 });
  const data: HolidayType[] = response?.data ?? [];

  return (
    <ListPage<HolidayType>
      title="Holiday"
      search
      data={data}
      filterFn={(rows, { search }) =>
        rows.filter((row) =>
          row.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      actionComponent={
        <Can action="create" subject={PERM_SUBJECTS.MASTER_HOLIDAY_TYPES}>
          <FormDialog
            trigger={
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="text-[14px] font-medium leading-5 text-white"
              >
                Add Holiday Type
              </Button>
            }
            title="Add New Holiday Type"
            size="lg"
            formId="holiday-form"
            okText="Add"
            cancelText="Cancel"
          >
            {({ close }: { close: () => void }) => (
              <AddHolidayForm onSuccess={close} />
            )}
          </FormDialog>
        </Can>
      }
      renderTable={(rows) => (
        <MasterSetupBody component={<HolidayTable data={rows} />} />
      )}
    />
  );
};
