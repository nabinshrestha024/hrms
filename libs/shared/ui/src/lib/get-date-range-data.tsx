import {
  addDays,
  endOfMonth,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';

interface DateRangeDataProps {
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
}

export const getDateRangeData = ({
  selectedDateRange,
  setSelectedDateRange,
}: DateRangeDataProps) => {
  return [
    {
      label: 'Today',
      from: new Date(),
      onClick: () => {
        setSelectedDateRange('Today');
      },
      isActive: selectedDateRange === 'Today',
    },
    {
      label: 'Next 7 days',
      from: new Date(),
      to: addDays(new Date(), 7),
      onClick: () => {
        setSelectedDateRange('Next 7 days');
      },
      isActive: selectedDateRange === 'Next 7 days',
    },
    {
      label: 'Next 30 days',
      from: new Date(),
      to: addDays(new Date(), 30),
      onClick: () => {
        setSelectedDateRange('Next 30 days');
      },
      isActive: selectedDateRange === 'Next 30 days',
    },
    {
      label: 'Last 7 days',
      from: subDays(new Date(), 7),
      to: new Date(),
      onClick: () => {
        setSelectedDateRange('Last 7 days');
      },
      isActive: selectedDateRange === 'Last 7 days',
    },
    {
      label: 'Last Month',
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
      onClick: () => {
        setSelectedDateRange('Last Month');
      },
      isActive: selectedDateRange === 'Last Month',
    },
  ];
};
