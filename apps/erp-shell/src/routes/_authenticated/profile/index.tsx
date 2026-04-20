import { createFileRoute } from '@tanstack/react-router';
import { ProfileHeader } from '../../../features/profile/profile-header';

export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
  beforeLoad: () => ({ subbreadcrumb: 'My Profile' }),
});

function RouteComponent() {
  return (
    <div className="w-full max-h-[calc(100vh-84px)] overflow-auto flex flex-col bg-background ">
      <div className="text-[20px] leading-7 font-semibold text-foreground px-12 py-6">
        Profile
      </div>
      <ProfileHeader />
    </div>
  );
}
