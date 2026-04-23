import { createFileRoute } from '@tanstack/react-router';
import { ConfigHolidayHeader } from '../../../features/configuration/holidays/holidays-header';

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
      <ConfigHolidayHeader />
    </div>
  );
}
