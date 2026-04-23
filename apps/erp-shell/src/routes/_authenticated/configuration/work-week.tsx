import { createFileRoute } from '@tanstack/react-router';
import { WorkWeekForm } from '../../../features/configuration/work-week/work-week-form';

export const Route = createFileRoute('/_authenticated/configuration/work-week')(
  {
    component: RouteComponent,
    beforeLoad: () => ({
      breadcrumb: 'Configuration',
      subbreadcrumb: 'Work Week',
    }),
  }
);

function RouteComponent() {
  return (
    <>
      <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB]">
        <div className="px-12 py-6 text-[20px] font-semibold leading-12 text-[#09090B] ">
          Company Profile
        </div>
        <WorkWeekForm />
      </div>
    </>
  );
}
