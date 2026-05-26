import { ContentShell } from '@erp/ui';
import { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const CalendarDetail = lazy(() =>
  import('../../../features/calendar/calendar').then((m) => ({
    default: m.CalendarPage,
  }))
);

export const Route = createFileRoute('/_authenticated/calendar/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Calendar',
    subbreadcrumb: 'Organizational Calendar',
  }),
});

function RouteComponent() {
  return (
    <ContentShell
      title="Organizational Calendar"
      titleClassName="lg:px-12 px-6"
    >
      <Suspense fallback={null}>
        <CalendarDetail />
      </Suspense>
    </ContentShell>
  );
}
