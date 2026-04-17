import { HRCard } from '@erp/ui';
import { reviewApprovalData } from '../schema/ReviewApprovalData';

interface ViewDocumentProps {
  id: string;
}
export const ViewDocument = ({ id }: ViewDocumentProps) => {
  return (
    <>
      <HRCard
        cardClassName="p-4 border border-border rounded-[4px] shadow-none bg-white"
        cardContentClassName="p-0"
      >
        {reviewApprovalData
          .filter((val) => val.employeeId === id)
          .map((val, index) => (
            <div key={index}>{val.size}</div>
          ))}
      </HRCard>
    </>
  );
};
