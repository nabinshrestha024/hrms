import { useDocumentReviews } from '@erp/data-access';
import { HRCard } from '@erp/ui';

interface ViewDocumentProps {
  id: string;
}

export const ViewDocument = ({ id }: ViewDocumentProps) => {
  const { data: response } = useDocumentReviews({ pageSize: 100 });
  const data = response?.data ?? [];

  return (
    <HRCard
      cardClassName="p-4 border border-border rounded-[4px] shadow-none bg-white"
      cardContentClassName="p-0"
    >
      {data
        .filter((val) => val.employeeId === id)
        .map((val) => (
          <div key={val.id}>{val.size}</div>
        ))}
    </HRCard>
  );
};
