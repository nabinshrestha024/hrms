import { createFileRoute } from '@tanstack/react-router';
import { ConfigurationLeaveTypes } from '../../../features/configuration/leave-type/leave-type-header';

export const Route = createFileRoute('/_authenticated/configuration/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Configuration',
    subbreadcrumb: 'Leave Type',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <ConfigurationLeaveTypes />
    </div>
  );
}
