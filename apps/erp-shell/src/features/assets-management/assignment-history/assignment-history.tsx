import { useAssets, type Asset } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import { AssignmentHistoryTable } from './table/assignment-history-table';

export const AssignmentHistory = () => {
  const { data: response } = useAssets({ pageSize: 100, status: 'assigned' });
  const filtered: Asset[] = response?.data ?? [];

  return (
    <ListPage<Asset>
      title="Assignment History"
      search
      dateRange
      data={filtered}
      renderTable={(rows) => <AssignmentHistoryTable data={rows} />}
      filterFn={(rows, { search }) =>
        rows.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      }
    />
  );
};
