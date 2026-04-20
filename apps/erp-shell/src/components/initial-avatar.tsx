import { cn } from '@erp/utils';

type InitialsCardProps = {
  name: string;
  className?: string;
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

export const InitialsCard = ({ name, className }: InitialsCardProps) => {
  const initials = getInitials(name);
  return (
    <div
      className={cn(
        `p-4 rounded-full bg-primary text-[12px] font-semibold text-white w-12 h-12 items-center justify-center flex ${className}`
      )}
    >
      {initials}
    </div>
  );
};
