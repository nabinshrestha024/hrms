import { Button } from '../../primitives/button';
import { DropDown } from './DropDown';

type ActionItem = {
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
  className?: string;
};

type ActionDropdownProps = {
  trigger: React.ReactNode;
  actions: ActionItem[];
  align?: 'start' | 'end';
};

export const ActionDropdown = ({
  trigger,
  actions,
  align = 'end',
}: ActionDropdownProps) => {
  return (
    <DropDown trigger={trigger} align={align} className="pt-1 pb-0 px-0">
      <div
        className="w-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            type="button"
            variant={action.variant || 'destructive'}
            onClick={action.onClick}
            className={`text-[14px] font-normal leading-5 cursor-pointer text-[#18181B] 
              ${index === actions.length - 1 ? 'border-t border-border' : ''}
              ${action.className || ''}
            `}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </DropDown>
  );
};
