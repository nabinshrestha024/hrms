import { createFileRoute } from '@tanstack/react-router';
import { Holiday } from '../../../features/master-setup/holiday/holiday';

export const Route = createFileRoute('/_authenticated/master-setup/')({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Master Setup',
    subbreadcrumb: 'Holiday Type',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col bg-background ">
      <Holiday />
    </div>
  );
}
