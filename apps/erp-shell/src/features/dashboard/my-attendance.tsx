import { HRCard } from '@erp/ui';
import { CalendarClock, CircleX, Clock4, ClockAlert } from 'lucide-react';
import { IconButton } from '../../components/icon-button';
import { myAttendance } from './schema/my-attendance-data';

export const MyAttendance = () => {
  const visibleAttendance = myAttendance.slice(0, 7);
  return (
    <>
      <HRCard
        cardClassName="w-full h-153 p-6 bg-white rounded-xl shadow-sm border-none"
        cardContentClassName="p-0 flex flex-col gap-4"
      >
        <div className="text-[18px] text-foreground font-medium leading-7">
          My Attendance
        </div>
        <div className="flex flex-col gap-3">
          {visibleAttendance.map((val, index) => (
            <HRCard
              cardClassName="p-2 bg-background rounded-xl overflow-auto shadow-none border-none"
              cardContentClassName="p-0"
              key={index}
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div
                    className={` p-1 rounded-sm  w-6 h-6
                `}
                  >
                    {val.event === 'Present' && (
                      <IconButton variant="secondary">
                        <Clock4 className="w-4 h-4 " />
                      </IconButton>
                    )}
                    {val.event === 'Leave' && (
                      <IconButton variant="primary">
                        <Clock4 className="w-4 h-4 " />
                      </IconButton>
                    )}
                    {val.event === 'Late' && (
                      <IconButton variant="warning">
                        <ClockAlert className="w-4 h-4 " />
                      </IconButton>
                    )}
                    {val.event === 'Weekend' && (
                      <IconButton variant="default">
                        <CircleX className="w-4 h-4 " />
                      </IconButton>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className={` text-[12px] leading-5 font-normal
                            ${val.event === 'Present' ? 'text-green-600' : ''}
                            ${val.event === 'Leave' ? 'text-blue-600' : ''}
                            ${val.event === 'Late' ? 'text-yellow-600' : ''}
                            ${val.event === 'Weekend' ? 'text-gray-600' : ''}
                        `}
                    >
                      {val.event}
                    </span>
                    <span className="text-[12px] leading-5 font-normal text-secondary-foreground line-clamp-1">
                      {val.clockIn} - {val.clockOut} . {val.workingHours}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[12px] leading-4 font-normal text-foreground">
                    {val.day}
                  </span>
                  <span className="text-[12px] leading-5 font-normal text-secondary-foreground">
                    {val.date}
                  </span>
                </div>
              </div>
            </HRCard>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <IconButton variant="request">
            <CalendarClock className="w-4 h-4" />
          </IconButton>
          <div className="text-[12px] leading-4 font-medium text-primary hover:underline hover:underline-primary hover:text-primary cursor-pointer">
            My Attendance Records
          </div>
        </div>
      </HRCard>
    </>
  );
};
