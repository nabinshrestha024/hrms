import { eachDayOfInterval, startOfMonth, endOfMonth, format } from 'date-fns';

export type AttendanceStatus = 'P' | 'A' | 'L' | 'H';

export type WorkRecord = {
  id: string;
  employeeName: string;
  branch: string;
  attendance: Record<string, AttendanceStatus>;
};

function generateAttendance(): Record<string, AttendanceStatus> {
  const now = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  });

  const statuses: AttendanceStatus[] = ['P', 'P', 'P', 'P', 'A', 'L'];

  return Object.fromEntries(
    days.map((day) => {
      const dayOfWeek = day.getDay();
      const dateKey = format(day, 'yyyy-MM-dd');

      if (dayOfWeek === 0 || dayOfWeek === 6) return [dateKey, 'H'];

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return [dateKey, status];
    })
  );
}

export const workRecordData: WorkRecord[] = [
  {
    id: '1',
    employeeName: 'Alice Johnson',
    branch: 'Baneshwor',
    attendance: generateAttendance(),
  },
  {
    id: '2',
    employeeName: 'Bob Smith',
    branch: 'Chabhail',
    attendance: generateAttendance(),
  },
  {
    id: '3',
    employeeName: 'Carol White',
    branch: 'Sanepa',
    attendance: generateAttendance(),
  },
  {
    id: '4',
    employeeName: 'David Brown',
    branch: 'Naxal',
    attendance: generateAttendance(),
  },
  {
    id: '5',
    employeeName: 'Eva Martinez',
    branch: 'Sanepa',
    attendance: generateAttendance(),
  },
];
