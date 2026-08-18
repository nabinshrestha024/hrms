import { ContentShell } from '@erp/ui';
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
  beforeLoad: () => ({
    breadcrumb: 'Overview',
  }),
});

function RouteComponent() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ContentShell
      title="Dashboard"
      subtitle={today}
      className="pb-21.5 px-6 lg:px-12"
      titleClassName="lg:px-0"
    >
      <div className="w-full  flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <PersonalInformation />
          <QuickAction />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <MyAttendance />
          <Notice />
          <Event />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <MyRequest />
          <TeamRequest />
        </div>
      </div>
    </ContentShell>
  );
}
