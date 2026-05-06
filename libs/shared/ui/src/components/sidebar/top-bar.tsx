import { Bell, ChevronsUpDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { HRCard } from '../card/card';
import { ActionDropdown } from '../dropdown/action-drop-down';
import { useNavigate } from '@tanstack/react-router';
interface TopBarProps {
  onLogout?: () => void;
}

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function TopBar({ onLogout }: TopBarProps) {
  const navigate = useNavigate();
  const now = useCurrentTime();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isAfter6AM = minutes >= 6 * 60;
  const isAfter4PM = minutes >= 16 * 60;
  const [open, setOpen] = useState(false);
  return (
    <>
      <HRCard
        cardClassName="sticky top-0 z-20 px-6 lg:px-12 py-4 border-none rounded-none shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] bg-white"
        cardContentClassName="flex justify-between p-0"
      >
        <div className="px-4 py-2 rounded-3xl border border-border bg-white shadow-none  text-[14px] font-medium leading-5 text-ring flex items-center justify-center gap-2 p-0 cursor-pointer">
          {isAfter4PM ? (
            <span>Clock Out</span>
          ) : isAfter6AM ? (
            <span>Clock In</span>
          ) : null}
          <span>{timeStr}</span>
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8  rounded-full p-2 bg-chart-1 cursor-pointer">
            <Bell className="text-ring w-4 h-4" />
          </div>
          <ActionDropdown
            open={open}
            onOpenChange={setOpen}
            trigger={
              <div className="flex items-center gap-2 px-2 py-1.5 bg-card rounded-lg cursor-pointer">
                <div className="w-8 h-8 ">
                  <img
                    src="/Image.png"
                    alt="profile"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col ">
                  <span className="text-[14px] text-foreground font-semibold leading-5">
                    John Doe
                  </span>
                  <span className="text-[12px] text-secondary-foreground font-normal leading-4">
                    Project Manager
                  </span>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-foreground" />
              </div>
            }
            actions={[
              {
                label: 'Profile',
                onClick: () => {
                  navigate({ to: '/profile' });
                },
              },
              {
                label: 'Logout',
                onClick: () => {
                  onLogout?.();
                  navigate({ to: '/login' });
                },
              },
            ]}
          />
        </div>
      </HRCard>
    </>
  );
}
