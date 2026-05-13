import { IconButton } from '../../../../components/icon-button';
import { Edit, Trash2 } from 'lucide-react';
import { HRCard } from '@erp/ui';
import { EducationType } from '../../schema/education-data';
interface EducationProps {
  education: EducationType[];
  onDelete?: (id: string) => void;
  onEdit?: (education: EducationType) => void;
}
export const EducationCard = ({
  education,
  onDelete,
  onEdit,
}: EducationProps) => {
  return (
    <>
      {education.length > 0 ? (
        <div>
          {education.map((val, index) => (
            <HRCard
              cardClassName="p-6 border border-border rounded-xl shadow-sm bg-white"
              cardContentClassName="p-0 "
              key={index}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] leading-4 font-semibold text-black">
                    {val.qualification}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] leading-4 font-normal text-foreground">
                      {val.university}
                    </span>
                    <span className="text-[12px] leading-4 font-normal text-secondary-foreground">
                      {val.endYear} - Completed
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <IconButton variant="default" onClick={() => onEdit?.(val)}>
                    <Edit className="w-5 h-5 font-bold" />
                  </IconButton>
                  <IconButton
                    variant="destructive"
                    onClick={() => onDelete?.(val.id)}
                  >
                    <Trash2 className="w-5 h-5 font-bold" />
                  </IconButton>
                </div>
              </div>
            </HRCard>
          ))}
        </div>
      ) : (
        <div className="text-[14px] text-secondary-foreground flex items-center justify-center">
          Education not found
        </div>
      )}
    </>
  );
};
