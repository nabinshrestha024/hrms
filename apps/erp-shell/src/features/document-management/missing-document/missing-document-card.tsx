import { useMissingDocuments } from '@erp/data-access';
import { HRCard } from '@erp/ui';

interface MissingDocumentCardProps {
  id: string;
  // Reserved for future close-on-success behaviour; required by the
  // FormDialog wiring upstream.
  onSuccess?: () => void;
}

export const MissingDocumentCard = ({ id }: MissingDocumentCardProps) => {
  const { data: response } = useMissingDocuments({ pageSize: 100 });
  const data = response?.data ?? [];

  return (
    <HRCard
      cardClassName="rounded-[4px] border border-border shadow-none bg-white p-4"
      cardContentClassName="p-0 flex flex-col gap-6"
    >
      <div className="text-[14px] font-medium leading-5">Missing Document</div>
      {data
        .filter((val) => val.employeeId === id)
        .map((val) => (
          <div key={val.id} className="flex flex-col gap-4">
            {val.missingDocs.map((doc, i) => (
              <div
                key={i}
                className="p-3 bg-chart-6 border border-border-1 rounded-xl text-[14px] font-medium leading-5"
              >
                {doc}
              </div>
            ))}
          </div>
        ))}
    </HRCard>
  );
};
