import { HRCard } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { MyAttendanceDetails } from '../../../features/attendance/my-attendance/my-attendance';

export const Route = createFileRoute(
  '/_authenticated/attendance/my-attendance'
)({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'My Attendance' }),
});

function RouteComponent() {
  return (
    <div className="w-full h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB]">
      <div className="px-12 py-6 text-[20px] font-semibold leading-12 text-[#09090B] ">
        My Attendance
      </div>
      <div className="px-6 pt-0 pb-32.5 ">
        <HRCard
          cardClassName="bg-white border-none p-6 shadow-none rounded-xl"
          cardContentClassName="p-0"
        >
          <MyAttendanceDetails />
        </HRCard>
      </div>
    </div>
  );
}
