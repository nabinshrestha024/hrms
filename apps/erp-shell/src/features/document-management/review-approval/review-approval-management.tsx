import { ListPage } from '@erp/ui';
import { reviewApprovalData } from '../schema/ReviewApprovalData';
import { ReviewApprovalCard } from './review-card';

export const ReviewApprovalManagement = () => {
  return (
    <ListPage
      title="Review & Approval"
      search
      data={reviewApprovalData}
      renderTable={(filtered) => <ReviewApprovalCard data={filtered} />}
      dropdowns={[
        { key: 'type', label: 'Document Type' },
        { key: 'status', label: 'Status' },
      ]}
      filterFn={(data, { search, dropdowns }) => {
        return data.filter((item) => {
          const matchesSearch = item.employeeName
            .toLowerCase()
            .includes(search.toLowerCase());

          const matchesDropdowns = Object.entries(dropdowns).every(
            ([key, value]) =>
              !value || String(item[key as keyof typeof item]) === value
          );

          return matchesSearch && matchesDropdowns;
        });
      }}
    />
  );
};
