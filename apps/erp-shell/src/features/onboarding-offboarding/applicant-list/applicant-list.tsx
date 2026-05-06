import { ListPage } from '@erp/ui';
import { candidates } from '../schema/ApplicantListData';
import { ApplicantListTable } from './table/applicant-list-table';

export const ApplicantList = () => {
  return (
    <ListPage
      title="Applicant List"
      data={candidates}
      renderTable={(filtered) => <ApplicantListTable data={filtered} />}
    />
  );
};
