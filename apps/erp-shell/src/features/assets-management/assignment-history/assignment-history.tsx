import { DocumentHeader } from '../../../components/document-management-header';
import { assetsData } from '../schema/AllAssetsData';
import { AssignmentHistoryTable } from './table/assignment-history-table';

export const AssignmentHistory = () => {
  const filtered = assetsData.filter((item) => item.status === 'Assigned');
  return (
    <DocumentHeader
      data={filtered}
      title="Assignment History"
      isSearch={true}
      sortByDate={true}
      renderTable={(filteredData) => (
        <AssignmentHistoryTable data={filteredData} />
      )}
      filterFn={(data, search) => {
        return data.filter((item) => {
          const matchesSearch = item.assetName
            .toLowerCase()
            .includes(search.toLowerCase());

          return matchesSearch;
        });
      }}
    />
  );
};
