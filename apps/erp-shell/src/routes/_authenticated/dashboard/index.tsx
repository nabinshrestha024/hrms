import { useDialogFormStore } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Event } from '../../../features/dashboard/Event';
import { MyAttendance } from '../../../features/dashboard/MyAttendance';
import { MyRequest } from '../../../features/dashboard/MyRequest';
import { Notice } from '../../../features/dashboard/Notice';
import { PersonalInformation } from '../../../features/dashboard/PersonalInformation';
import { QuickAction } from '../../../features/dashboard/QuickAction';
import { TeamRequest } from '../../../features/dashboard/TeamRequest';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: RouteComponent,
  beforeLoad: () => ({ breadcrumb: 'Dashboard' }),
});

function RouteComponent() {
  const { onOpen } = useDialogFormStore();
  return (
    <>
      <div className="w-full pb-21.5 h-[calc(100vh-84px)] overflow-auto flex flex-col bg-[#F9FAFB] ">
        <div className="flex flex-col px-12 py-6 ">
          <div className="text-[24px] font-semibold leading-8 text-[#09090B]">
            Dashboard
          </div>
          <div className="text-[14px] font-normal leading-5 text-[#71717A]">
            Thursday, March 12, 2026
          </div>
        </div>
        <div className="w-full px-12 flex flex-col gap-4 ">
          <div className="flex  gap-4">
            <PersonalInformation />
            <QuickAction />
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <MyAttendance />
            <Notice onOpen={onOpen} />
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
