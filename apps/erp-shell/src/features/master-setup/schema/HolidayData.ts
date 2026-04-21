import type { ReactNode } from 'react';

export const holidayData = [
  {
    leaveType: 'National Holiday',
    details: 'Mandatory holidays observed nationwide',
    indicator: 'purple',
  },
  {
    leaveType: 'Regional Holiday',
    details: 'Holidays specific to state or local regions',
    indicator: 'purple',
  },
  {
    leaveType: 'National Holiday',
    details: 'Special holidays granted by the organization',
    indicator: 'purple',
  },
];

export type HolidayDataType = {
  leaveType: string;
  details: string;
  indicator: ReactNode;
};
