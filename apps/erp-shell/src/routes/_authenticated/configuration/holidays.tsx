import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const ConfigHolidayHeader = lazy(() =>
  import('../../../features/configuration/holidays/holidays-header').then(
    (m) => ({ default: m.ConfigHolidayHeader })
  )
);

export const Route = createFileRoute('/_authenticated/configuration/holidays')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Configuration',
    subbreadcrumb: 'Holidays',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Suspense fallback={null}>
        <ConfigHolidayHeader />
      </Suspense>
    </div>
  );
}
