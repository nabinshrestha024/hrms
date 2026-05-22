import { ListPage } from '@erp/ui';
import { Event, eventsData } from '../schema/EventData';
import { EventCard } from './event-holiday-card';
import { EventList } from './event-holiday-list';

export const EventAndHoliday = () => {
  const data: Event[] = eventsData as Event[];
  return (
    <>
      <ListPage
        title="Events & Holidays"
        search
        data={data}
        renderCard={(filtered: Event[]) => <EventCard data={filtered} />}
        renderTable={(filtered: Event[]) => <EventList data={filtered} />}
        filterFn={(data, { search }) => {
          return data.filter((item: Event) => {
            const matchesSearch = item.title
              ?.toLowerCase()
              .includes(search.toLowerCase());
            return matchesSearch;
          });
        }}
      />
    </>
  );
};
