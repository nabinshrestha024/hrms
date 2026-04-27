import { useDirectoryEntries } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import type { DirectoriesType } from './schema/Directories';
import { DirectoriesCard } from './directories-card';
import { DirectoriesTable } from './table/directories-table';

export const Directories = () => {
  const { data: response } = useDirectoryEntries({ pageSize: 100 });
  // Inner table reads `employeeID` (legacy uppercase). Bridge canonical
  // `employeeId` here until Phase 3.2 reconciles consumers.
  const data = (response?.data ?? []).map((r) => ({
    ...r,
    employeeID: r.employeeId,
  })) as unknown as DirectoriesType[];

  return (
    <>
      <ListPage<DirectoriesType>
        title="Employee Directories"
        search
        data={data}
        dropdowns={[{ key: 'branch', label: 'Branch' }]}
        renderCard={(filtered) => <DirectoriesCard data={filtered} />}
        renderTable={(filtered) => <DirectoriesTable data={filtered} />}
        filterFn={(data, { search, dropdowns }) => {
          const dropdown = dropdowns.branch;
          return data.filter((item) => {
            const matchesSearch = item.employeeName
              ?.toLowerCase()
              .includes(search.toLowerCase());
            const matchesDropdown = dropdown ? item.branch === dropdown : true;
            return matchesSearch && matchesDropdown;
          });
        }}
      />
    </>
  );
};
