import { useMissingDocuments, type MissingDocument } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import { MissingDocumentTable } from './table/missing-document-table';

export const MissingDocumnetManagement = () => {
  const { data: response } = useMissingDocuments({ pageSize: 100 });
  const data: MissingDocument[] = response?.data ?? [];

  return (
    <ListPage<MissingDocument>
      title="Missing Documents"
      search
      data={data}
      renderTable={(filtered) => <MissingDocumentTable data={filtered} />}
      dropdowns={[
        { key: 'department', label: 'Department' },
        { key: 'branch', label: 'Branch' },
        { key: 'priority', label: 'Priority' },
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
