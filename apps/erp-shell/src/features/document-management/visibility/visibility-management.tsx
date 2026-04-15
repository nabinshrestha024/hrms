import { DocumentHeader } from '../../../components/document-management-header';
import { visibilityData } from '../schema/VisibilityData';
import { VisbilityTable } from './table/visibility-table';

export const VisibilityManagement = () => {
  return (
    <>
      <DocumentHeader
        data={visibilityData}
        title="Document Visibility"
        sortByDate={true}
        renderTable={(filtered) => <VisbilityTable data={filtered} />}
        dropdowns={[
          { key: 'category', label: 'All Category' },
          { key: 'visibility', label: 'Status' },
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
