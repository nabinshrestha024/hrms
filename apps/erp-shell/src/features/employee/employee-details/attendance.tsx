import { DatePicker, getDateRangeData, HRCard } from '@erp/ui';
import { cardData } from '../schema/attendance-card-data';
import { AttendanceTable } from './attendance/attendance-table';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export const AttendanceInformation = () => {
  const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>();
  const [selectedDateRange, setSelectedDateRange] = useState('');

  return (
    <>
      <div className="max-h-115 flex flex-col gap-6  overflow-auto pr-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-[18px] font-medium leading-7 text-foreground">
            Attendance
          </div>
          <div className="flex justify-end">
            <DatePicker
              value={dateRangeValue}
              onChange={setDateRangeValue}
              placeholder="Jan 20, 2023 - Feb 09, 2023"
              className="px-4 py-2.5 border-border"
              presets={getDateRangeData({
                selectedDateRange,
                setSelectedDateRange,
              })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cardData.map((items) => (
            <HRCard
              cardClassName="p-6 border-l-4 border-l-outline border-b-none border-r-none border-t-none rounded-xl shadow-none bg-primary-foreground"
              cardContentClassName="flex flex-col gap-2 p-0"
            >
              <div className="text-[12px] font-medium leading-4">
                {items.event}
              </div>
              <div className="text-[32px] font-normal text-secondary">
                {items.days}
              </div>
            </HRCard>
          ))}
        </div>
        <AttendanceTable />
      </div>
    </>
  );
};
