import { createFileRoute } from '@tanstack/react-router';
import { WorkType } from '../../../features/master-setup/work-type/work-type';

export const Route = createFileRoute('/_authenticated/master-setup/work-type')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Work Type',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col bg-background ">
      <WorkType />
    </div>
  );
}
