import { ListPage } from '@erp/ui';
import { assetsData } from '../schema/AllAssetsData';
import { AssignmentHistoryTable } from './table/assignment-history-table';

export const AssignmentHistory = () => {
  const filtered = assetsData.filter((item) => item.status === 'Assigned');
  return (
    <ListPage
      title="Assignment History"
      search
      dateRange
      data={filtered}
      renderTable={(rows) => <AssignmentHistoryTable data={rows} />}
      filterFn={(data, { search }) => {
        return data.filter((item) =>
          item.assetName.toLowerCase().includes(search.toLowerCase())
        );
      }}
    />
  );
};
