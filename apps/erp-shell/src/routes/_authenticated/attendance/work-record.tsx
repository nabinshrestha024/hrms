import { HRCard } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { WorkRecord } from '../../../features/attendance/work-record/work-record';

export const Route = createFileRoute('/_authenticated/attendance/work-record')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Work Record' }),
});

function RouteComponent() {
  return (
    <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB]">
      <div className="px-12 py-6 text-[20px] font-semibold leading-12 text-[#09090B] ">
        Attendance Record
      </div>
      <div className="px-6 pt-0 pb-32.5 ">
        <HRCard
          cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
          cardContentClassName="p-0"
        >
          <WorkRecord />
        </HRCard>
      </div>
    </div>
  );
}
