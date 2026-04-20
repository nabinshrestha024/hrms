import { createFileRoute } from '@tanstack/react-router';
import { Assets } from '../../../features/assets-management/all-assets/assets';

export const Route = createFileRoute(
  '/_authenticated/assets-management/all-assets'
)({
  component: RouteComponent,
  beforeLoad: () => ({
    breadcrumb: 'Assets Management',
    subbreadcrumb: 'All Assets',
  }),
});

function RouteComponent() {
  return (
    <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB] ">
      <Assets />
    </div>
  );
}
