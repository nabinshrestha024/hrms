import { Button } from '../../primitives/button';
import { DropDown } from './drop-down';

type ActionItem = {
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
  className?: string;
};

type ActionDropdownProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  actions: ActionItem[];
  align?: 'start' | 'end';
  dropdownClassName?: string;
};

export const ActionDropdown = ({
  open,
  onOpenChange,
  trigger,
  actions,
  dropdownClassName,
  align = 'end',
}: ActionDropdownProps) => {
  return (
    <DropDown
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      align={align}
      className={`px-2 ${dropdownClassName}`}
    >
      <div
        className="w-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            onClick={() => {
              action.onClick?.();
              onOpenChange(false);
            }}
            className={`text-[14px] font-normal leading-5 cursor-pointer text-foreground ${action.className}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </DropDown>
  );
};
