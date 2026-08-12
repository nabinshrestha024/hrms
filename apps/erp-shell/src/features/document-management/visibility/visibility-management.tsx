import { useEmployeeDocuments, type EmployeeDocument } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import { VisbilityTable } from './table/visibility-table';

export const VisibilityManagement = () => {
  const { data: response } = useEmployeeDocuments({ pageSize: 100 });
  const data: EmployeeDocument[] = response?.data ?? [];

  return (
    <ListPage<EmployeeDocument>
      title="Document Visibility"
      search
      dateRange
      data={data}
      renderTable={(filtered) => <VisbilityTable data={filtered} />}
      dropdowns={[
        { key: 'category', label: 'Category' },
        // Schema field renamed `visibility` -> `visible`. Boolean values
        // surface as "true" / "false" strings in the dropdown — same as
        // the legacy behaviour.
        { key: 'visible', label: 'Status' },
      ]}
      filterFn={(rows, { search, dropdowns }) => {
        return rows.filter((row) => {
          const matchesSearch = row.employeeName
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesDropdowns = Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(row[key as keyof typeof row]) === value
          );
          return matchesSearch && matchesDropdowns;
        });
      }}
    />
  );
};
