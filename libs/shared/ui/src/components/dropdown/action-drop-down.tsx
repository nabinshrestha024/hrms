import { ReactNode } from 'react';
import { Button } from '../../primitives/button';
import { DropDown } from './drop-down';

type ActionItem = {
  label: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
  className?: string;
  isActive?: boolean;
};

type ActionDropdownProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  actions: ActionItem[];
  align?: 'start' | 'end';
  dropdownClassName?: string;
  displayClassName?: string;
};

export const ActionDropdown = ({
  open,
  onOpenChange,
  trigger,
  actions,
  dropdownClassName,
  displayClassName,
  align = 'end',
}: ActionDropdownProps) => {
  return (
    <DropDown
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      align={align}
      className={`px-0 ${dropdownClassName}`}
    >
      <div
        className={`w-full flex flex-col  ${displayClassName}`}
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
            className={`text-[14px] font-normal leading-5 cursor-pointer text-foreground justify-start rounded-none px-2 ${
              action.className
            } ${action.isActive ? 'bg-muted' : ''}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </DropDown>
  );
};
