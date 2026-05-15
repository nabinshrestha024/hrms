import { useDocumentReviews, type DocumentReview } from '@erp/data-access';
import { ListPage } from '@erp/ui';
import { ReviewApprovalCard } from './review-card';

export const ReviewApprovalManagement = () => {
  const { data: response } = useDocumentReviews({ pageSize: 100 });
  const data: DocumentReview[] = response?.data ?? [];

  return (
    <ListPage<DocumentReview>
      title="Review & Approval"
      search
      data={data}
      renderTable={(filtered) => <ReviewApprovalCard data={filtered} />}
      dropdowns={[
        { key: 'type', label: 'DocumentType' },
        { key: 'status', label: 'Status' },
      ]}
      filterFn={(rows, { search, dropdowns }) => {
        return rows.filter((row) => {
          const matchesSearch = row.employeeName
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesDropdowns = Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(row[key as keyof typeof row]) === value
          );

          return matchesSearch && matchesDropdowns;
        });
      }}
    />
  );
};
