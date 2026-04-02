import { Bell, ChevronsUpDown } from 'lucide-react';
import { useState, useEffect } from 'react';

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function TopBar() {
  const now = useCurrentTime();
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <>
      <div className="sticky top-0 z-20 px-12 py-4 flex justify-between shadow-[0_1px_2px_0_rgba(255,0,0,0.05)] bg-white">
        <div className="px-4 py-2 rounded-3xl border border-[#E4E4E7] flex items-center gap-2 text-[14px] font-medium leading-5 text-[#4F39F6]">
          {timeStr > '6:00 AM' && <span>Clock In</span>}
          {timeStr > '4:00 PM' && <span>Clock Out</span>}
          <span>{timeStr}</span>
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8  rounded-full p-2 bg-[#E0E7FF] ">
            <Bell className="text-indigo-600 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 px-2 py-1.5 bg-[#FAFAFA] rounded-lg">
            <div className="w-8 h-8 ">
              <img
                src="/Image.png"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col ">
              <span className="text-[14px] text-[#3F3F46] font-semibold leading-5">
                John Doe
              </span>
              <span className="text-[12px] text-[#71717A] font-normal leading-5">
                Project Manager
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-[#3F3F46]" />
          </div>
        </div>
      </div>
    </>
  );
}
