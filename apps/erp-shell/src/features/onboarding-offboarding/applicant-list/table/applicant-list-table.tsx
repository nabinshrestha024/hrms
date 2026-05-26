import { DataTable, HRCard } from '@erp/ui';
import { Candidate } from '../../schema/ApplicantListData';
import { useApplicantListTable } from './use-applicant-list-table';

interface ApplicantListTableProps {
  data: Candidate[];
}

export const ApplicantListTable = ({ data }: ApplicantListTableProps) => {
  const { columns, table } = useApplicantListTable({
    data,
  });

  return (
    <>
      <div className="px-6 pb-19.5 bg-background">
        <HRCard
          cardClassName="p-6 rounded-xl shadow-none bg-white border-none"
          cardContentClassName="p-0"
        >
          <DataTable
            table={table}
            columns={columns}
            className="xl:p-0 p-0 rounded-none"
          />
        </HRCard>
      </div>
    </>
  );
};
