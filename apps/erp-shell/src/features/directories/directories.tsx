import { ListPage } from '@erp/ui';
import { directoriesDetails } from './schema/Directories';
import { DirectoriesCard } from './directories-card';
import { DirectoriesTable } from './table/directories-table';

export const Directories = () => {
  return (
    <>
      <ListPage
        title="Employee Directories"
        isSearch={true}
        isTabs={true}
        data={directoriesDetails}
        dropdownKey="branch"
        dropdownLabel="Branch"
        renderCard={(filtered) => <DirectoriesCard data={filtered} />}
        renderTable={(filtered) => <DirectoriesTable data={filtered} />}
        filterFn={(data, search, dropdown) => {
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
