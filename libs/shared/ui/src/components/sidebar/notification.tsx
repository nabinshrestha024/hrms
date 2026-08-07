import { Bell, BellMinus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';
import { Button } from '../../primitives/button';

export const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-8 h-8 relative rounded-full p-2 bg-chart-1 cursor-pointer"
          aria-label="Notification"
        >
          <Bell className="text-ring w-4 h-4" />
          <span className="absolute top-0 right-0 flex items-center justify-center h-2 w-2 px-1 text-[10px] font-semibold text-white bg-badge-text-3 rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-75 mt-2 max-h-35 overflow-hidden px-0 py-1 shadow-none rounded-xl border border-border"
      >
        <DropdownMenuLabel className="p-0 bg-white flex flex-col">
          <div className="flex-1">
            <div className="text-[16px] font-medium leading-6 text-foreground p-3 border-b border-b-border text-center">
              Notifications
            </div>
            <div className="flex gap-2 items-center justify-center border-b border-b-border px-3 py-4">
              <BellMinus className="w-4 h-4 text-secondary-foreground" />
              <span className="text-[12px] font-normal leading-4 text-secondary-foreground">
                No new notifications at this time
              </span>
            </div>
            <div className="text-[14px] font-medium leading-5 text-foreground px-3 py-2 text-center">
              Go to notification page
            </div>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
