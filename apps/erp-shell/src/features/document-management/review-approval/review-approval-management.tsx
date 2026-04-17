import { DocumentHeader } from '../../../components/document-management-header';
import { reviewApprovalData } from '../schema/ReviewApprovalData';
import { ReviewApprovalCard } from './review-card';

export const ReviewApprovalManagement = () => {
  return (
    <>
      <DocumentHeader
        data={reviewApprovalData}
        title="Review & Approval"
        isSearch={true}
        renderTable={(filtered) => <ReviewApprovalCard data={filtered} />}
        dropdowns={[
          { key: 'type', label: 'Document Type' },
          { key: 'status', label: 'Status' },
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
