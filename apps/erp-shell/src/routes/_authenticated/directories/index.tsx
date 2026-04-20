import { createFileRoute } from '@tanstack/react-router';
import { Directories } from '../../../features/directories/directories';

export const Route = createFileRoute('/_authenticated/directories/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Directories',
    subbreadcrumb: 'Employee Directories',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-auto bg-background">
      <Directories />
    </div>
  );
}
