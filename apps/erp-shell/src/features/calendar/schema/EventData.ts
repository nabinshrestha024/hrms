export const eventsData = [
  {
    id: 1,
    title: 'New Year Day',
    type: 'Holiday',
    date: 'Jan 1',
    day: 'Mon',
    note: 'Upcoming shared event.',
  },
  {
    id: 2,
    title: 'International Women’s Day',
    type: 'Holiday',
    date: 'Mar 8',
    day: 'Fri',
    note: 'Upcoming shared event.',
  },
  {
    id: 3,
    title: 'Roniya Maharjan’s Birthday',
    type: 'Birthday',
    date: 'Sep 4',
    day: 'Wed',
    team: 'Design Team',
  },
  {
    id: 4,
    title: 'Smriti Thapa’s Work Anniversary',
    type: 'Anniversary',
    date: 'Sep 12',
    day: 'Wed',
    joinedOn: '2023-01-15',
  },
  {
    id: 5,
    title: 'Teej Celebration',
    type: 'Event',
    date: 'Aug 12',
    day: 'Mon',
    note: 'Upcoming shared event.',
  },
];

export type EventType = 'Holiday' | 'Birthday' | 'Anniversary' | 'Event';

export type Event = {
  id: number;
  title: string;
  type: EventType;
  date: string;
  day: string;
  note?: string;
  joinedOn?: string;
};
