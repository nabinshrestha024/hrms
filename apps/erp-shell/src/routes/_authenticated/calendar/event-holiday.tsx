import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const EventHolidayDetail = lazy(() =>
  import('../../../features/calendar/event-holiday/event-holiday').then(
    (m) => ({ default: m.EventAndHoliday })
  )
);

export const Route = createFileRoute('/_authenticated/calendar/event-holiday')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Calendar',
    subbreadcrumb: 'Events & Holidays',
  }),
});

function RouteComponent() {
  return (
    <ContentShell>
      <Suspense fallback={null}>
        <EventHolidayDetail />
      </Suspense>
    </ContentShell>
  );
}
