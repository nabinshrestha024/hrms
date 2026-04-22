export const configHolidayData = [
  {
    holidayType: 'National Holiday',
    days: '08',
    color: '#51A2FF',
  },
  {
    holidayType: 'Regional Holiday',
    days: '0',
    color: '#05DF72',
  },
  {
    holidayType: 'Company Holiday',
    days: '01',
    color: '#C27AFF',
  },
  {
    holidayType: 'Optional Holiday',
    days: '01',
    color: '#FF8904',
  },
];

export type ConfigHolidayType = {
  holidayType: string;
  days: string;
  color: string;
};

export const holidayTableData = [
  {
    name: 'New Year’s Day',
    date: '2026/01/01',
    day: 'Thursday',
    type: 'National',
    description: 'New Year Celebration',
  },
  {
    name: 'Office Anniversary',
    date: '2026/07/05',
    day: 'Tuesday',
    type: 'Company',
    description: '3rd Year',
  },
];

export type HolidayTableType = {
  name: string;
  date: string;
  day: string;
  type: string;
  description: string;
};
