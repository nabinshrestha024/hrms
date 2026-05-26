import { useMemo, useState } from 'react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

import { ControlledFormDialog, HRCard } from '@erp/ui';
import { AddCalendarEventForm } from './calendar-event-form';

export const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: 'Diwali Holiday',
      start: '2026-05-29',
      end: '2026-06-03',
      display: 'background',
      backgroundColor: '#fabfbf',
    },
    // {
    //   title: 'NewYear',
    //   start: '2026-05-29',
    // },
    // {
    //   title: 'Losar',
    //   start: '2026-05-29',
    // },
    {
      title: 'Holiday',
      start: '2026-07-20',
      end: '2026-08-03',
      display: 'background',
      backgroundColor: '#FEF2F2',
    },
  ]);

  const calendarEvents = useMemo(() => {
    const countByDate = events.reduce<Record<string, number>>((acc, event) => {
      const dateKey = event.start;
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    return events.map((event) => {
      const isSingleEventDate = countByDate[event.start] === 1;
      return {
        ...event,
        display: isSingleEventDate ? 'background' : 'auto',
      };
    });
  }, [events]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="px-6 pb-32.5">
        <HRCard
          cardClassName="p-3 lg:p-6 border-none rounded-xl shadow-none bg-white"
          cardContentClassName="flex flex-col p-0"
        >
          <HRCard
            cardClassName="p-3 lg:p-6 border border-border rounded-xl shadow-none"
            cardContentClassName="flex flex-col p-0"
          >
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              height="auto"
              dateClick={handleDateClick}
              events={calendarEvents}
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
            />
          </HRCard>
        </HRCard>
      </div>
      <ControlledFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Add Events"
        size="lg"
        okText="Add"
        cancelText="Cancel"
        formId="addCalendarEvent"
        dialogClassName="border-t-[6px] border-r-[2px] border-b border-l border-primary rounded-xl shadow-sm"
        componentClassName="py-4 pl-4 pr-2"
      >
        <AddCalendarEventForm
          selectedDate={selectedDate}
          onSave={(newEvent: any) => {
            setEvents((prev) => [...prev, newEvent]);
            setDialogOpen(false);
          }}
        />
      </ControlledFormDialog>
    </>
  );
};
