import { createFileRoute } from '@tanstack/react-router';
import { ShiftHeader } from '../../../features/configuration/shift/shift-header';

export const Route = createFileRoute('/_authenticated/configuration/shifts')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Configuration',
    subbreadcrumb: 'Shifts',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <ShiftHeader />
    </div>
  );
}
