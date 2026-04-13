import { DocumentHeader } from '../../../components/document-management-header';
import { missingDocumentData } from '../schema/MissingDocumnetData';
import { MissingDocumentTable } from './table/missing-document-table';

export const MissingDocumnetManagement = () => {
  return (
    <>
      <DocumentHeader
        data={missingDocumentData}
        title="Missing Documents"
        renderTable={(filtered) => <MissingDocumentTable data={filtered} />}
        dropdowns={[
          { key: 'department', label: 'Department' },
          { key: 'branch', label: 'Branch' },
          { key: 'priority', label: 'Priority' },
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
      />
    </>
  );
};
