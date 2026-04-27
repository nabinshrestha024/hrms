import { ContentShell } from '@erp/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ProfileHeader } from '../../../features/profile/profile-header';

export const Route = createFileRoute('/_authenticated/profile/')({
  component: RouteComponent,
  beforeLoad: () => ({ subbreadcrumb: 'My Profile' }),
});

function RouteComponent() {
  return (
    <ContentShell title="Profile" className="bg-background">
      <ProfileHeader />
    </ContentShell>
  );
}
