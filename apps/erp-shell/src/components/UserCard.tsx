import { Dot } from 'lucide-react';
import { InitialsCard } from './InitialAvatar';
import { HRCard } from 'node_modules/@erp/ui/src/components/card/Card';

interface CardProps {
  employeeName?: string;
  employeeId?: string;
  department?: string;
}

export const UserCard = ({
  employeeName,
  employeeId,
  department,
}: CardProps) => {
  return (
    <>
      <HRCard
        cardClassName="p-3 bg-muted rounded-xl shadow-none border-none"
        cardContnetClassName="flex gap-2  p-0"
      >
        <InitialsCard name={employeeName || ''} />
        <div className="flex flex-col gap-1">
          <span className="text-[14px] leading-5 font-medium text-foreground">
            {employeeName}
          </span>
          <span className="flex text-[12px] leading-4 font-medium text-foreground items-center">
            {employeeId}{' '}
            <Dot className="text-[20px] text-secondary-foreground" />
            {department}
          </span>
        </div>
      </HRCard>
    </>
  );
};
