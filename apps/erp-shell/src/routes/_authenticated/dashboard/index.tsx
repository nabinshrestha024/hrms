import { createFileRoute } from '@tanstack/react-router';
import { Event } from '../../../features/dashboard/event';
import { MyAttendance } from '../../../features/dashboard/my-attendance';
import { MyRequest } from '../../../features/dashboard/my-request';
import { Notice } from '../../../features/dashboard/notice';
import { PersonalInformation } from '../../../features/dashboard/personal-information';
import { QuickAction } from '../../../features/dashboard/quick-action';
import { TeamRequest } from '../../../features/dashboard/team-request';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="w-full pb-21.5 h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB] ">
        <div className="flex flex-col px-12 py-6 ">
          <div className="text-[24px] font-semibold leading-8 text-[#09090B]">
            Dashboard
          </div>
          <div className="text-[14px] font-normal leading-5 text-[#71717A]">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
        <div className="w-full px-12 flex flex-col gap-4 ">
          <div className="flex  gap-4">
            <PersonalInformation />
            <QuickAction />
          </div>
          <div className="flex flex-col lg:flex-row  gap-4">
            <MyAttendance />
            <Notice />
            <Event />
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <MyRequest />
            <TeamRequest />
          </div>
        </div>
      </div>
    </>
  );
}
