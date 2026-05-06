import { useServerTableState } from '@erp/ui';
import { getApplicantListColumns } from './get-applicant-list-column';
import { Candidate } from '../../schema/ApplicantListData';

interface ApplicantListTableProps {
  data: Candidate[];
}

export function useApplicantListTable({ data }: ApplicantListTableProps) {
  const columns = getApplicantListColumns();

  const tableState = useServerTableState<Candidate>({
    data,
    totalCount: data.length,
    columns,
    getRowId: (row: Candidate) => row.name,
  });

  return { ...tableState, columns };
}
