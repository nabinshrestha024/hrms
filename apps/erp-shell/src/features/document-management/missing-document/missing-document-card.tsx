import { HRCard } from '@erp/ui';
import { missingDocumentData } from '../schema/MissingDocumnetData';

interface MissingDocumentCardProps {
  id: string;
  onSuccess?: () => void;
}
export const MissingDocumentCard = ({
  id,
  onSuccess,
}: MissingDocumentCardProps) => {
  return (
    <>
      <HRCard
        cardClassName="rounded-[4px] border border-border shadow-none bg-white p-4"
        cardContentClassName="p-0 flex flex-col gap-6"
      >
        {missingDocumentData
          .filter((val) => val.employeeId === id)
          .map((val, index) => (
            <div key={index} className="flex flex-col gap-4">
              {val.missingDoc.map((doc, i) => (
                <div
                  key={i}
                  className="p-3 bg-chart-6 border border-[#FFF085] rounded-xl text-[14px] font-medium leading-5"
                >
                  {doc}
                </div>
              ))}
            </div>
          ))}
      </HRCard>
    </>
  );
};
